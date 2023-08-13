import { useState } from 'react';

export const useTabTitles = (tabs: string[]) => {
    const [activeTab, setActiveTab] = useState(tabs[0])
  
    return { tabTitles: tabs, activeTab, setActiveTab };
  }