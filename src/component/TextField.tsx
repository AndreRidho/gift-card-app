function TextField(props: {
  title: string;
  value: string;
  length: number;
  setValue?: (value: React.SetStateAction<string>) => void;
  handleValue?: (value: string) => void;
}) {
  return (
    <>
      <div className="subtitle">{props.title}</div>
      <input
        type="text"
        value={props.value}
        onChange={(event) => {
          if (props.setValue) props.setValue(event.target.value);
          if (props.handleValue) props.handleValue(event.target.value);
        }}
        maxLength={props.length}
        style={{
          padding: "10px",
          marginLeft: "30px",
          marginRight: "30px",
          fontSize: "16px",
          borderRadius: "4px",
          border: "1px solid #ccc",
        }}
      />
    </>
  );
}

export default TextField;
