const FlexContainer = ({ children }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: ".3em",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: "200px",
      }}
    >
      {children}
    </div>
  );
};

export default FlexContainer;
