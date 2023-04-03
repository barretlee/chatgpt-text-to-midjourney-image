import { useState, useCallback, useEffect } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';

export function getServerSideProps() {
  const serviceUrl = process.env.SERVICE_URL;
  return {
    props: { serviceUrl },
  };
}

export default function Home(props) {
  const [inputText, setInputText] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [promptText, setPromptText] = useState('');
  const [imageModel, setImageModel] = useState('');
  const [width, setWidth] = useState(1024);
  const [height, setHeight] = useState(768);
  const [isLoading, setIsLoading] = useState(false);

  const { serviceUrl } = props;

  useEffect(() => {
    const model = 'prompthero/openjourney:9936c2001faa2194a261c01381f90e65261879985476014a0a37a334593a05eb';
    const urlSearchParams = new URLSearchParams(window.location.search);
    const m = urlSearchParams.get('m');
    const h = urlSearchParams.get('h');
    const w = urlSearchParams.get('w');
    setImageModel(m || model);
    setWidth(w || 1000);
    setHeight(h || 800);
  }, []);

  const handleInputChange = useCallback((e) => {
    setInputText(e.target.value);
  }, []);

  const fetchImage = useCallback(async (prompt) => {
    setIsLoading(true);
    setImageUrl('');
    setPromptText('');
    try {
      const response = await fetch(serviceUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors', 
        body: JSON.stringify({
          prompt,
          image_model: imageModel,
          height,
          width,
        }),
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
        {/* <div className={styles.title}>
          <h1>Text2Image</h1>
          <p>Image Model: {imageModel}</p>
        </div> */}
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