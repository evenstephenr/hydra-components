type AlertProps = {
  message: string,
}

export function Alert (props: AlertProps) {
  const { message } = props;
  return alert(message);
}
