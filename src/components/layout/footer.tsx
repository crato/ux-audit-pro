export default function Footer() {
  return (
    <footer className="bg-white border-t">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
        <p className="text-center text-sm text-gray-500">
          © {new Date().getFullYear()} UX Audit Pro. All rights reserved.
        </p>
      </div>
    </footer>
  );
}