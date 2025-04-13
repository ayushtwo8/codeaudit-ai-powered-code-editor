import { useState } from "react";
import { Button } from "./components/ui/button";
import axios from "axios";
import prismjs from 'react-prism'

const App = () => {

  const [code, setCode] = useState('');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const reviewHandler = async () => {
    setLoading(true);
    setResult('')
    try{
      const response = await axios.get('http://localhost:5000/api/v1/ai/get-response',{
        params: {
          code
        }
      });

      if(response){
        setResult(response.data.response);
       
      }
    } catch(err){
      
      setError(err.message || "An error occured");
      console.log(err);
    } finally{
      setLoading(false);
    }
  }
  

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-neutral-900 min-h-screen p-6">
      {/* input box */}
      <div className="grid grid-cols-1" >
      <textarea
        placeholder="Enter your code here..."
        className="flex-1 resize-none  text-white rounded-lg p-4 outline-none border border-gray-600 focus:ring-1 focus:ring-blue-200"
        onChange={(e) => {
          setCode(e.target.value);
        }}
        value={code}
      />
      <Button onClick={() => {
       reviewHandler() 
      } }  className="m-2 w-20 col-end-2 bg-blue-700 hover:bg-blue-900" disabled={loading}>{loading ? "..." : "Review"}</Button>
      </div>

      {/* result area */}
      <div className="bg-gray-700 rounded-xl p-4 h-full flex items-center justify-center text-gray-300">
        {error && (
          <div className="text-red-400">Error: {error}</div>
        )}
        { loading ? (
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
            <p className="text-xl">Reviewing you code...</p>
            
          </div>
        ) :
        result ? (
          result
        ) : (
          <p className="text-gray-500">Results will appear here</p>
        )}
      </div>
    </div>
  );
};

export default App;
