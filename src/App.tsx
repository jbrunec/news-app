import MainContainer from "./components/MainContainer";
import NewsContainer from "./components/NewsContainer";
import NewsFeed from "./components/NewsFeed";
import { Input } from "./components/ui/input";

function App() {
  return (
    <MainContainer>
      <NewsContainer>
        <div className="flex mb-8">
          <Input placeholder="Keyword search..." />
          {/* <Input placeholder="Category search..." /> */}
          {/* <Input placeholder="Keyword search..." /> */}
        </div>
        <div>
          {/* {data.articles.map((item) => (
            <p>{item.title}</p>
          ))} */}
          <NewsFeed />
        </div>
      </NewsContainer>
    </MainContainer>
  );
}

export default App;
