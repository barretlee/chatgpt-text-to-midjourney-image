import { useState, useCallback } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [inputText, setInputText] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [promptText, setPromptText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = useCallback((e) => {
    setInputText(e.target.value);
  }, []);

  const fetchImage = useCallback(async (prompt) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/text2image`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });
      const data = await response.json();
      setImageUrl(data.url);
      setPromptText(data.text);
    } catch (error) {
      console.error('Error fetching image:', error);
    }
    setIsLoading(false);
  }, []);

  return (
    <>
      <Head>
        <title>Text2Image</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>Text2Image</h1>
        <div className={styles.container}>
          <div className={styles.inputContainer}>
            <textarea
              className={styles.input}
              onChange={handleInputChange}
              placeholder="Enter text here"
            />
            <button className={styles.button} onClick={() => fetchImage(inputText)}>
              {isLoading ? 'Loading...' : 'Generate'}
            </button>
          </div>
          {promptText && <p className={styles.promptText}>Prompt: {promptText}</p>}
          {imageUrl && <img className={styles.image} src={imageUrl} alt="Generated" />}
        </div>
      </main>
    </>
  );
}