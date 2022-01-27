export function Messagebox(props: { message: string }) {
  return (
    <div>
      <h3>Messagebox</h3>
      <p id="message">{props.message}</p>
    </div>
  );
}
