import React, { useState } from 'react';
import axios from 'axios';

const QueryInput = () => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false); // 新增加载状态

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // 设置加载状态为 true
    try {
      const res = await axios.post('http://localhost:20291/query', { query });
      setResponse(res.data.message);
    } catch (err) {
      setResponse('Error: ' + err.message);
    } finally {
      setIsLoading(false); // 无论成功或失败,都设置加载状态为 false
    }
    setQuery(''); // 清空查询输入框
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <textarea
          rows={5}
          cols={50}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Please enter your query"
        />
        <button type="submit">Submit</button>
      </form>
      {isLoading ? <p>Waiting for result...</p> : <p>{response}</p>}
    </div>
  );
};

export default QueryInput;