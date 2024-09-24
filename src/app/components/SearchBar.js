const SearchBar = ({ onSearch }) => {
    return (
      <input
        type="text"
        placeholder="Search for a dish..."
        onChange={(e) => onSearch(e.target.value)}
      />
    );
  };
  
  export default SearchBar;
  