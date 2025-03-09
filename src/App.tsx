import MainContainer from "./components/MainContainer";
import NewsContainer from "./components/NewsContainer";
import NewsFeed from "./components/NewsFeed";
import SearchAndFilter from "./components/SearchAndFilter";
import NewsItemsContextProvider from "./contexts/NewsItemsContextProvider";

function App() {
  return (
    <MainContainer>
      <NewsContainer>
        <SearchAndFilter />
        <NewsItemsContextProvider>
          <NewsFeed />
        </NewsItemsContextProvider>
      </NewsContainer>
    </MainContainer>
  );
}

export default App;
