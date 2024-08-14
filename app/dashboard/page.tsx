'use client';
import React, { useState, useEffect } from 'react';
import JSZip from 'jszip';
import FileSaver from 'file-saver';
import { FaPaste, FaTimes } from 'react-icons/fa';
import TopMenu from '../TopMenu';
import Footer from '../Footer';

type DownloadLink = {
  quality: string;
  link: string;
};

const Page = () => {
  const [videoUrl, setVideoUrl] = useState('');
  const [downloadLinks, setDownloadLinks] = useState<DownloadLink[]>([]);
  const [playlist, setPlaylist] = useState<DownloadLink[]>([]);
  const [youtubeEmbedUrl, setYoutubeEmbedUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showClearIcon, setShowClearIcon] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const savedPlaylist = localStorage.getItem('playlist');
    if (savedPlaylist) {
      setPlaylist(JSON.parse(savedPlaylist));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('playlist', JSON.stringify(playlist));
  }, [playlist]);

  const fetchDownloadLinks = async (videoId: string) => {
    setLoading(true);
    setError(null);

    const apiUrl = `https://youtube-media-downloader.p.rapidapi.com/v2/video/details?videoId=${videoId}`;
    const apiKey = 'b9b276d0c1msh822603b0c726babp1e9c4djsn4fbc5f965e78';

    try {
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'x-rapidapi-key': apiKey,
          'x-rapidapi-host': 'youtube-media-downloader.p.rapidapi.com',
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      if (data.status) {
        // Separate video and audio links
        const videoFormats = new Map<string, string>();
        const audioFormats = new Map<string, string>();

        if (data.videos && data.videos.items) {
          data.videos.items.forEach((video: any) => {
            const format = video.quality || 'Video';
            if (!videoFormats.has(format)) {
              videoFormats.set(format, video.url);
            }
          });
        }

        if (data.audios && data.audios.items) {
          data.audios.items.forEach((audio: any) => {
            const format = audio.quality || 'Audio';
            if (!audioFormats.has(format)) {
              audioFormats.set(format, audio.url);
            }
          });
        }

        const videoLinks: DownloadLink[] = Array.from(videoFormats.entries()).map(([quality, link]) => ({
          quality,
          link,
        }));

        const audioLinks: DownloadLink[] = Array.from(audioFormats.entries()).map(([quality, link]) => ({
          quality,
          link,
        }));

        // Update video player URL with the first video link
        if (videoLinks.length > 0) {
          setYoutubeEmbedUrl(videoLinks[0].link);
        }

        setDownloadLinks([...videoLinks, ...audioLinks]);
      } else {
        throw new Error('Failed to retrieve video. Please check the URL.');
      }
    } catch (error) {
      setError('Failed to retrieve video. Please check the URL.');
      console.error('Error fetching download links:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    const videoId = extractVideoId(videoUrl);
    if (videoId) {
      fetchDownloadLinks(videoId);
    } else {
      setError('Invalid video URL.');
    }
  };

  const extractVideoId = (url: string): string | null => {
    const urlParams = new URLSearchParams(new URL(url).search);
    return urlParams.get('v');
  };

  const addToPlaylist = (link: DownloadLink) => {
    if (playlist.length >= 12) {
      alert('Playlist is full.');
      return;
    }
    if (!playlist.some(item => item.link === link.link)) {
      setPlaylist(prevPlaylist => [...prevPlaylist, link]);
    } else {
      alert('Audio is already in the playlist.');
    }
  };

  const downloadAllAudios = async () => {
    if (playlist.length === 0) {
      alert('Playlist is empty.');
      return;
    }

    const zip = new JSZip();
    const promises: Promise<void>[] = [];

    playlist.forEach((audio, index) => {
      promises.push(
        fetch(audio.link)
          .then(response => {
            if (!response.ok) {
              throw new Error('Failed to fetch audio resource');
            }
            return response.blob();
          })
          .then(blob => {
            zip.file(`audio_${index + 1}.mp3`, blob, { binary: true });
          })
          .catch(error => {
            console.error(`Error fetching audio ${index + 1}:`, error);
            alert(`Failed to fetch audio ${index + 1}.`);
          })
      );
    });

    try {
      await Promise.all(promises);

      zip.generateAsync({ type: 'blob' }).then(content => {
        FileSaver.saveAs(content, 'playlist.zip');
      });
    } catch (error) {
      console.error('Error downloading audios:', error);
      alert('Failed to download all audios as zip.');
    }
  };

  const handleClear = () => {
    setVideoUrl('');
    setYoutubeEmbedUrl(null); // Clear the video player URL
    setShowClearIcon(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVideoUrl(e.target.value);
    setShowClearIcon(e.target.value.trim() !== '');
  };

  const handlePaste = () => {
    navigator.clipboard.readText()
      .then(text => {
        setVideoUrl(text);
        setShowClearIcon(true);
      })
      .catch(error => {
        console.error('Error reading from clipboard:', error);
      });
  };

  useEffect(() => {
    if (downloadLinks.length > 0) {
      const resultsElement = document.getElementById('downloadLinks');
      if (resultsElement) {
        resultsElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [downloadLinks]);

  // Separate video and audio links
  const videoLinks = Array.from(new Set(downloadLinks.filter(link => !link.quality.toLowerCase().includes('audio'))));
  const audioLinks = Array.from(new Set(downloadLinks.filter(link => link.quality.toLowerCase().includes('audio'))));

  return (
    <section>
      <TopMenu />
      <div className="p-8 font-sans bg-[#232222] bg-cover -mt-20 bg-center text-center min-h-screen">
        <h1 className="text-2xl md:text-4xl font-bold mb-4 text-white">YouTube Video Downloader</h1>

        <div className="relative">
          <input
            type="text"
            value={videoUrl}
            onChange={handleInputChange}
            placeholder="Enter YouTube Video URL"
            className="w-full p-2 border border-gray-300 rounded mb-4 pr-10"
          />
          {showClearIcon ? (
            <FaTimes className="absolute right-3 top-3 cursor-pointer text-gray-400" onClick={handleClear} />
          ) : (
            <FaPaste className="absolute right-3 top-3 cursor-pointer text-gray-400" onClick={handlePaste} />
          )}
        </div>

        <button
          onClick={handleDownload}
          type="button"
          className="text-gray-900 bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-xl text-lg px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 me-2 mb-2"
        >
          <img className='h-8 px-1' src="https://cdn-icons-png.flaticon.com/128/15525/15525198.png" alt="" />
          Download Now
        </button>

        {youtubeEmbedUrl && (
          <div className="mb-4 flex flex-col items-center justify-center mt-5">
            <video className="w-[700px] rounded-xl" autoPlay muted controls>
              <source src={youtubeEmbedUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        )}

        {loading && (
          <div className="container">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        )}

        {error && (
          <div className="text-red-500">{error}</div>
        )}

        <div id="downloadLinks">
          {videoLinks.length > 0 && (
            <div className="mt-8">
              <h2 className="text-xl font-bold text-white mb-4">Video Formats</h2>
              <div className="flex flex-wrap gap-4 justify-center">
                {videoLinks.map((link, index) => (
                  <div key={`video-${index}`} className="mb-4 flex flex-col md:flex-row gap-y-5 items-center">
                    <a
                      href={link.link}
                      download
                      className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    >
                      Download {link.quality}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}

          {audioLinks.length > 0 && (
            <div className="mt-8">
              <h2 className="text-xl font-bold text-white mb-4">Audio Formats</h2>
              <div className="flex flex-wrap gap-4 justify-center">
                {audioLinks.map((link, index) => (
                  <div key={`audio-${index}`} className="mb-4 flex flex-col md:flex-row gap-y-5 items-center">
                    <button
                      onClick={() => addToPlaylist(link)}
                      className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mr-2"
                    >
                      Add to Playlist
                    </button>
                    <a
                      href={link.link}
                      download
                      className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    >
                      Download {link.quality}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {playlist.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-bold text-white mb-4">Playlist</h2>
            <ul className="list-disc pl-5 text-white">
              {playlist.map((audio, index) => (
                <li key={index} className="mb-4 flex flex-col items-center">
                  <span className="text-white">{audio.quality}</span>
                  <audio className="w-full rounded-xl mt-2" controls>
                    <source src={audio.link} type="audio/mp3" />
                    Your browser does not support the audio element.
                  </audio>
                  <button
                    onClick={() => setPlaylist(prev => prev.filter(item => item.link !== audio.link))}
                    className="mt-2 text-red-500"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
            <button
              onClick={downloadAllAudios}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Download All as Zip
            </button>
          </div>
        )}
      </div>
      <Footer />
    </section>
  );
};

export default Page;
