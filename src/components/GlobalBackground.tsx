import GeometricCircles from "./GeometricCircles";

const GlobalBackground = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <GeometricCircles />
    </div>
  );
};

export default GlobalBackground;
