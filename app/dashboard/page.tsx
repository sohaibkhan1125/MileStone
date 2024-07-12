
'use client';
import React, { useState, useEffect } from 'react';
import JSZip from 'jszip';
import TopMenu from '../TopMenu';
import Footer from '../Footer';

interface PlaylistItem {
  url: string;
  blob: Blob;
  name: string;
}

const PageClient: React.FC = () => {
  const [link, setLink] = useState('');
  const [format, setFormat] = useState('mp3');
  const [playlist, setPlaylist] = useState<PlaylistItem[]>([]);

  useEffect(() => {
    const savedPlaylist = localStorage.getItem('playlist');
    if (savedPlaylist) {
      setPlaylist(JSON.parse(savedPlaylist));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('playlist', JSON.stringify(playlist));
  }, [playlist]);

  const downloadVideo = (link: string, format: string) => {
    const iframe = `<iframe style="width:100%;height:60px;border:0;overflow:hidden;" scrolling="no" src="https://loader.to/api/button/?url=${link}&f=${format}"></iframe>`;
    const downloadDiv = document.querySelector('.download-video') as HTMLElement;
    if (downloadDiv) {
      downloadDiv.innerHTML = iframe;
    }
  };

  const fetchAndAddToPlaylist = async (link: string) => {
    if (playlist.length >= 12) {
      alert('Playlist can only contain up to 12 songs.');
      return;
    }

    try {
      const response = await fetch(`https://loader.to/api/button/?url=${link}&f=mp3`);
      const blob = await response.blob();
      const name = `song_${playlist.length + 1}.mp3`;
      const newSong: PlaylistItem = { url: link, blob, name };
      setPlaylist([...playlist, newSong]);
    } catch (error) {
      console.error(`Failed to download song from ${link}:`, error);
    }
  };

  const handleDownloadClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (link && format) {
      downloadVideo(link, format);
      fetchAndAddToPlaylist(link);
    }
  };

  const handleRemoveSong = (index: number) => {
    const updatedPlaylist = playlist.filter((_, i) => i !== index);
    setPlaylist(updatedPlaylist);
  };

  const handleDownloadPlaylist = async () => {
    const zip = new JSZip();
    const folder = zip.folder('playlist');

    // Add each song to ZIP file
    playlist.forEach((song) => {
      folder?.file(song.name, song.blob);
    });

    // Generate ZIP file and trigger download
    zip.generateAsync({ type: 'blob' }).then((content) => {
      const link = document.createElement('a');
      link.href = URL.createObjectURL(content);
      link.download = 'playlist.zip';
      link.click();
    });
  };

  return (
    <div>
      <TopMenu />
      <div className="max-w-md mx-auto mt-5">
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="bg-blue-500 p-4 text-white">
            <h2 className="text-xl font-bold">Youtube Videos Download Script</h2>
          </div>
          <div className="p-4">
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Online Videos Link:</label>
              <input
                type="text"
                name="link"
                className="link form-input mt-1 block w-full"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                required
              />
            </div>
            <form className="form-download">
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Select Video Format:</label>
                <select
                  className="format form-select mt-1 block w-full"
                  value={format}
                  onChange={(e) => setFormat(e.target.value)}
                  required
                >
                  <option value="mp3">Mp3</option>
                  <option value="144">144 Mp4</option>
                  <option value="360">360 Mp4</option>
                  <option value="480">480 Mp4</option>
                  <option value="720">720 Mp4</option>
                  <option value="1080">1080 Mp4</option>
                  <option value="4k">4k Mp4</option>
                  <option value="8k">8k Mp4</option>
                </select>
              </div>
              <div className="mb-4 download-video">
                <button
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full click-btn-down"
                  type="submit"
                  onClick={handleDownloadClick}
                >
                  Click Me
                </button>
              </div>
            </form>
            
          </div>
        </div>

       
      </div>
      <div className='p-10'>
          <h2 className='text-2xl font-semibold'>Download YouTube videos effortlessly with our fast and reliable downloader.</h2>
          <ul className='flex flex-col gap-y-5 mt-5 text-xl'>
            <li>&#8226;Fast and Efficient: Download videos quickly with minimal wait times.</li>
            <li>&#8226;High Quality: Choose from multiple resolutions and formats for your downloads.</li>
            <li>&#8226;User-Friendly Interface: Simple and intuitive design for a seamless experience.</li>
            <li>&#8226;Secure and Reliable: Your data is safe with our secure download process and privacy policies.</li>
          </ul>
        </div>
      <Footer />
    </div>
  );
};

export default PageClient;