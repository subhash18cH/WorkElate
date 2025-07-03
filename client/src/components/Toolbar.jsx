const Toolbar = ({ color, setColor, strokeWidth, setStrokeWidth, onClear }) => {
  return (
    <div style={{ display: "flex", gap: "1rem", padding: "1rem", background: "#f0f0f0" }}>
      <label>
        Color:
        <select value={color} onChange={(e) => setColor(e.target.value)}>
          <option value="#000000">Black</option>
          <option value="#ff0000">Red</option>
          <option value="#0000ff">Blue</option>
          <option value="#00ff00">Green</option>
        </select>
      </label>
      <label>
        Stroke:
        <input
          type="range"
          min="1"
          max="10"
          value={strokeWidth}
          onChange={(e) => setStrokeWidth(e.target.value)}
        />
      </label>
      <button onClick={onClear}>Clear Canvas</button>
    </div>
  );
};

export default Toolbar;
