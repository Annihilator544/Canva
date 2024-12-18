import React from 'react';
import { Button } from "./ui/button";
import { 
  Layout, 
  Film, 
  Image, 
  FileText, 
  Share2, 
  Globe, 
  Upload,
  MoreHorizontal,
} from "lucide-react";
import headerSvg from '../assets/header.svg'

const DashboardHeader = ({ title, buttonText, bottomSection }) => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#E4F0FA00] to-[#9DD3FF] stops-[#9DD3FF] p-6 rounded-lg mb-6">
        <h1 className="text-4xl font-light text-black mb-4">{title}</h1>
        <Button variant="secondary" className="bg-white text-black hover:bg-gray-100 drop-shadow-2xl">
          {buttonText}
        </Button>
      </div>

      {/* Tools Grid */}
      {bottomSection ?
      <div className="grid grid-cols-5 gap-4 mb-8 md:grid-cols-10">
        <ToolButton icon={<FileText />} label="Doc" color="text-cyan-500" />
        <ToolButton icon={<Layout />} label="Canvas" color="text-green-500" />
        <ToolButton icon={<Image />} label="Graphics" color="text-orange-500" />
        <ToolButton icon={<Share2 />} label="Share" color="text-pink-500" />
        <ToolButton icon={<Film />} label="Video" color="text-purple-500" />
        <ToolButton icon={<FileText />} label="Print" color="text-indigo-500" />
        <ToolButton icon={<Globe />} label="Website" color="text-blue-500" />
        <ToolButton icon={<Layout />} label="Custom" color="text-gray-500" />
        <ToolButton icon={<Upload />} label="Upload" color="text-slate-500" />
        <ToolButton icon={<MoreHorizontal />} label="More" color="text-gray-700" />
      </div>
      :
      <></>}
    </div>
  );
};

const ToolButton = ({ icon, label, color }) => {
  return (
    <div className="flex flex-col items-center gap-2">
      <Button
        variant="ghost"
        className={`w-12 h-12 rounded-full ${color} hover:bg-gray-100`}
      >
        {icon}
      </Button>
      <span className="text-xs text-gray-600">{label}</span>
    </div>
  );
};


export default DashboardHeader;