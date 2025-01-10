import { SidebarProvider } from './app/context/SidebarContext';

export default function App() {
  return (
    <SidebarProvider>
      <Sidebar />
      {/* ...existing app content... */}
    </SidebarProvider>
  );
}
  