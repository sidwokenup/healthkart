export default function Footer() {
  return (
    <footer className="w-full p-4 border-t border-gray-200 mt-auto">
      <div className="container mx-auto text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} HealthKart
      </div>
    </footer>
  );
}
