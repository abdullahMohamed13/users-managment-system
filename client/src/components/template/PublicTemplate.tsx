import Navbar from "../organisms/Navbar";
import Footer from "../organisms/Footer";

interface Props {
  children: React.ReactNode;
}
export default function PublicTemplate({ children }: Props) {
  return (
    <div>
      <Navbar />
      <main className="ds-container">{children}</main>
      <Footer />
    </div>
  );
}
