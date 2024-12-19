import { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import CodeEditor from './components/CodeEditor';
import StartSection from './components/StartSection';
import { login } from './api/api';

function App() {
  const [showStartSection, setShowStartSection] = useState(true);
  const [showEditor, setShowEditor] = useState(false);
  const [showFullscreenModal, setShowFullscreenModal] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); 
  const [code, setCode] = useState(''); 
  const [id, setId] = useState('');
  const [q, setQ] = useState('');
  const appRef = useRef(null);
  const codeEditorRef = useRef(null); 

  const handleStart = async (npmInput) => {
    setIsLoading(true);
    setLoadingMessage('Please wait...');
    try {
      const numberId = parseInt(npmInput, 10);
      console.log('Sending login request with ID:', numberId); 
      const response = await login(numberId);
      console.log('Login response:', response); 
      if (response.result) {
        setShowStartSection(false);
        setShowEditor(true);
        setCode(response.code); 
        setId(numberId); 
        setQ(response.q);
        setLoadingMessage('');
      } else {
        setErrorMessage('NPM is not registered');
        setTimeout(() => {
          setErrorMessage('');
        }, 3000);
      }
    } catch (error) {
      console.error('Login Error:', error); 
      setErrorMessage('NPM is not registered');
      setTimeout(() => {
        setErrorMessage('');
      }, 3000);
    } finally {
      setIsLoading(false); 
      setLoadingMessage('');
    }
  };

  const handleAllowFullscreen = () => {
    if (appRef.current.requestFullscreen) {
      appRef.current.requestFullscreen().then(() => {
        setShowFullscreenModal(false);
      }).catch(() => {});
    } else {
      alert('Your browser does not support full screen mode.');
    }
  };

  const handleSubmissionSuccess = () => {
    setShowEditor(false);
    setShowStartSection(true);
    setCode('');
    setId('');
    setQ('');
    setLoadingMessage('');
    setShowFullscreenModal(true); 
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        if (showEditor && codeEditorRef.current) {
          console.log('Exiting fullscreen from CodeEditor, submitting code...');
          codeEditorRef.current.handleSubmit();
        }
        if (showStartSection) {
          console.log('Exiting fullscreen from StartSection, showing fullscreen modal...');
          setShowFullscreenModal(true);
        }
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, [showEditor, showStartSection]); 

  return (
    <div ref={appRef} className="relative h-screen w-screen overflow-hidden bg-gray-900">
      <h1 className="text-2xl font-bold mb-4 flex justify-center text-white">Ujian</h1>

      {showFullscreenModal && (
        <div className="absolute inset-0 flex items-center justify-center bg-dark-bg bg-opacity-90 z-50">
          <div className="bg-purple p-8 rounded-md shadow-md text-center">
            <p className="mb-4 text-white">This app requires full screen access. Allow?</p>
            <div className="flex justify-center">
              <button
                onClick={handleAllowFullscreen}
                className="px-4 py-2 bg-light-purple text-green-500 rounded-md"
              >
                Allow
              </button>
            </div>
          </div>
        </div>
      )}

      <AnimatePresence mode="wait">
        {showStartSection && (
          <StartSection onStart={handleStart} /> 
        )}

        {showEditor && (
          <motion.div
            key="codeEditor"
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          >
            <CodeEditor 
              ref={codeEditorRef}
              code={code} 
              id={id} 
              onSubmitSuccess={handleSubmissionSuccess} 
              q={q}
            /> 
          </motion.div>
        )}
      </AnimatePresence>

      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <p
            className="text-white text-lg"
            style={{ position: 'absolute', bottom: '25%', left: '50%', transform: 'translateX(-50%)' }}
          >
            {loadingMessage}
          </p>
        </div>
      )}

      {errorMessage && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-4 py-2 rounded">
          {errorMessage}
        </div>
      )}
    </div>
  );
}

export default App;
