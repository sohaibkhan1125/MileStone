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
  const [youtubeEmbedUrl, setYoutubeEmbedUrl] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [showClearIcon, setShowClearIcon] = useState(false);

  useEffect(() => {
    const savedPlaylist = localStorage.getItem('playlist');
    if (savedPlaylist) {
      setPlaylist(JSON.parse(savedPlaylist));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('playlist', JSON.stringify(playlist));
  }, [playlist]);

  const fetchDownloadLinks = async (url: string) => {
    setLoading(true);
    const apiUrl = `https://youtube-video-and-shorts-downloader.p.rapidapi.com/smvd/get/all?url=${encodeURIComponent(url)}`;
    const apiKey = 'b9b276d0c1msh822603b0c726babp1e9c4djsn4fbc5f965e78';

    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': apiKey,
        'x-rapidapi-host': 'youtube-video-and-shorts-downloader.p.rapidapi.com',
        'Content-Type': 'application/json'
      }
    };

    try {
      const response = await fetch(apiUrl, options);
      const data = await response.json();

      if (data && Array.isArray(data)) {
        const links: DownloadLink[] = data.map((item: any) => ({
          quality: item.quality,
          link: item.url
        }));

        setDownloadLinks(links);
        setYoutubeEmbedUrl(links.length > 0 ? links[0].link : '');
      } else {
        alert('Failed to retrieve video. Please check the URL.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while fetching the video.');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    setDownloadLinks([]);
    setYoutubeEmbedUrl('');
    fetchDownloadLinks(videoUrl);
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
    setShowClearIcon(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVideoUrl(e.target.value);
    if (e.target.value.trim() !== '') {
      setShowClearIcon(true);
    } else {
      setShowClearIcon(false);
    }
  };

  const handlePaste = () => {
    const navigatorAny = navigator as any;
    if (!navigatorAny.clipboard || !navigatorAny.clipboard.readText) {
      console.error('Clipboard API not supported');
      return;
    }

    navigatorAny.clipboard.readText().then((text: string) => {
      setVideoUrl(text);
      setShowClearIcon(true);
    }).catch((error: Error) => {
      console.error('Error reading from clipboard:', error);
    });
  };

  useEffect(() => {
    // Scroll to results when downloadLinks change
    if (downloadLinks.length > 0) {
      const resultsElement = document.getElementById('downloadLinks');
      if (resultsElement) {
        resultsElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [downloadLinks]);

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
        
        <button onClick={handleDownload} type="button" className="text-gray-900 bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-xl text-lg px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 me-2 mb-2">
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

        <div className='flex flex-col  justify-center items-center'>
          <div id="downloadLinks">
            {downloadLinks.map((link, index) => (
              <div key={index} className="mb-4 flex flex-col md:flex-row gap-y-5">
                <a
                  href={link.link}
                  download
                  className="text-blue-600 font-semibold bg-white px-2 py-2 rounded-xl hover:bg-slate-50 hover:underline mr-2"
                >
                  Download {link.quality}
                </a>
                {link.quality.toLowerCase().includes('audio') && (
                  <button
                    onClick={() => addToPlaylist(link)}
                    className="bg-green-500 text-white  px-4 py-2 rounded hover:bg-green-600 ml-2"
                  >
                    Add to Playlist
                  </button>
                )}
                {!link.quality.toLowerCase().includes('audio') && (
                  <button
                    onClick={() => window.open(link.link, '')}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                  >
                    Download
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
        
        {playlist.length > 0 && (
          <div className="mt-4">
            <h2 className="text-xl font-bold mb-4 text-white">Playlist</h2>
            <ul>
              {playlist.map((audio, index) => (
                <li key={index} className="flex items-center mb-2">
                  <span className="text-white">{audio.quality}</span>
                  <button
                    onClick={() => setPlaylist(playlist.filter((item) => item.link !== audio.link))}
                    className="ml-4 text-red-500"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
            <button
              onClick={downloadAllAudios}
              className="text-white bg-blue-500 px-4 py-2 rounded hover:bg-blue-600"
            >
              Download All as ZIP
            </button>
          </div>
        )}
      </div>
      <Footer />
    </section>
  );
};

export default Page;
