import { useState } from "react"

const AUTOSAVE_DEBOUNCE_TIME = 2000;

const useAutoSave = (onSave: (data: any) => void) => {
    const [autoSaveTimer, setAutoSaveTimer] = useState<NodeJS.Timeout | null>(null)

    const dispatchAutoSave = (data: unknown) => {
        if (autoSaveTimer) {
          clearTimeout(autoSaveTimer); 
        }
        const timer = setTimeout(() => onSave(data), AUTOSAVE_DEBOUNCE_TIME);
        setAutoSaveTimer(timer as unknown as NodeJS.Timeout); 
      };

      const triggerManualSave = (data: unknown) => {
        if (autoSaveTimer) {
          clearTimeout(autoSaveTimer); 
        }
        onSave(data); 
      };

    return {dispatchAutoSave, triggerManualSave}
}
