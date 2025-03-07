import MainContainer from "./components/MainContainer";
import NewsContainer from "./components/NewsContainer";
import NewsFeed from "./components/NewsFeed";
import SearchAndFilter from "./components/SearchAndFilter";

function App() {
  return (
    <MainContainer>
      <NewsContainer>
        <SearchAndFilter />
        <NewsFeed />
      </NewsContainer>
    </MainContainer>
  );
}

export default App;
