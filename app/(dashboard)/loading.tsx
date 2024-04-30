interface LoadingProps {}

const Loading: React.FC<LoadingProps> = ({}) => {
  return (
    <main className="text-center">
      <h2 className="text-primary">Loading...</h2>
      <p>Hopefully for just a little while :)</p>
    </main>
  );
};

export default Loading;
