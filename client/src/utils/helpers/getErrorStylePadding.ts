const getErrorStylePadding = (
  width: number,
  isError: boolean,
  errorLength: number
): number => {
  if (width <= 767 || !isError) return 16;

  switch (true) {
    case errorLength <= 16:
      return 115;
    case errorLength === 21:
      return 146;
    case errorLength > 21:
      return 200;
    default:
      return 162;
  }
};

export default getErrorStylePadding;
