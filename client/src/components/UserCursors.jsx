
const UserCursors = ({ cursors }) => {
  return (
    <>
      {Object.entries(cursors).map(([id, cursor]) => (
        <div
          key={id}
          style={{
            position: "absolute",
            left: cursor.x,
            top: cursor.y,
            backgroundColor: cursor.color,
            width: 10,
            height: 10,
            borderRadius: "50%",
            pointerEvents: "none",
            transform: "translate(-50%, -50%)",
            zIndex: 999
          }}
        />
      ))}
    </>
  );
};

export default UserCursors;
