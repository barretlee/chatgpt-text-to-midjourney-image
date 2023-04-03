import { useState, useCallback, useEffect } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [inputText, setInputText] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [promptText, setPromptText] = useState('');
  const [imageModel, setImageModel] = useState('');
  const [direct, setDirect] = useState(false);
  const [proxyUrl, setProxyUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const model = 'prompthero/openjourney:9936c2001faa2194a261c01381f90e65261879985476014a0a37a334593a05eb';
    const urlSearchParams = new URLSearchParams(window.location.search);
    const m = urlSearchParams.get('m');
    const direct = urlSearchParams.get('direct');
    const proxyUrl = urlSearchParams.get('proxyUrl');
    setImageModel(m || model);
    setDirect(!!direct);
    setProxyUrl(proxyUrl);
  }, []);

  const handleInputChange = useCallback((e) => {
    setInputText(e.target.value);
  }, []);

  const fetchImage = useCallback(async (prompt) => {
    setIsLoading(true);
    setImageUrl('');
    setPromptText('');
    try {
      const response = await fetch(proxyUrl || '/api/text2image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors', 
        body: JSON.stringify({
          prompt,
          image_model: imageModel,
          direct,
        }),
      });
      const data = await response.json();
      setImageUrl(data.url);
      setPromptText(data.text);
    } catch (error) {
      console.error('Error fetching image:', error);
    }
    setIsLoading(false);
  }, [ proxyUrl ]);

  return (
    <>
      <Head>
        <title>Text2Image</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        {/* <div className={styles.title}>
          <h1>Text2Image</h1>
          <p>Image Model: {imageModel}</p>
        </div> */}
        <div className={styles.container}>
          <div className={styles.inputContainer}>
            <textarea
              defaultValue={promptText}
              className={styles.input}
              onChange={handleInputChange}
              placeholder="Enter text here"
            />
            <button className={styles.button} onClick={() => fetchImage(inputText)}>
              {isLoading ? 'Loading...' : 'text2image'}
            </button>
          </div>
          {promptText && <p className={styles.promptText}>Prompt: {promptText}</p>}
          {imageUrl && <img className={styles.image} src={imageUrl} alt={promptText} />}
        </div>
      </main>
    </>
  );
}