import React, { useState, useEffect } from "react";
import "./App.css";
import { Switch, Route, useLocation } from "react-router-dom";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function App() {
  const [url, setUrl] = useState("");
  const [redirectUrl, setRedirectUrl] = useState("");
  let query = useQuery();
  useEffect(() => {
    const oneNoteUrl = query.get("uri");
    if (oneNoteUrl) {
      window.open(oneNoteUrl, "onenote");
    }
  }, [query]);

  const onChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    let src = event.target.value;
    let regexp = /(onenote:.+)/;
    let result = src.match(regexp);
    let redirectUrl = "";
    if (result?.[1]) {
      redirectUrl = `${window.location.origin}?uri=${result[1]}`;
    }
    navigator.clipboard.writeText(redirectUrl);
    setRedirectUrl(redirectUrl);
    setUrl(event.target.value);
  };

  return (
    <Switch>
      <Route path="/" exact>
        <div className="App">
          <header className="App-header">
            <textarea value={url} onChange={onChange} cols={100} rows={10} />
            <span>{redirectUrl}</span>
          </header>
        </div>
      </Route>
    </Switch>
  );
}

export default App;
