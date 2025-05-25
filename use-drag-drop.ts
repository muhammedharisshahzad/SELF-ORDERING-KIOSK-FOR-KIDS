import { useState, useCallback } from 'react';
import { BurgerIngredient } from '@shared/schema';

export interface DragDropState {
  draggedItem: BurgerIngredient | null;
  isDragOver: boolean;
}

export function useDragDrop() {
  const [dragState, setDragState] = useState<DragDropState>({
    draggedItem: null,
    isDragOver: false
  });

  const handleDragStart = useCallback((ingredient: BurgerIngredient) => {
    setDragState(prev => ({
      ...prev,
      draggedItem: ingredient
    }));
  }, []);

  const handleDragEnd = useCallback(() => {
    setDragState(prev => ({
      ...prev,
      draggedItem: null,
      isDragOver: false
    }));
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragState(prev => ({
      ...prev,
      isDragOver: true
    }));
  }, []);

  const handleDragLeave = useCallback(() => {
    setDragState(prev => ({
      ...prev,
      isDragOver: false
    }));
  }, []);

  const handleDrop = useCallback((e: React.DragEvent, onDrop: (ingredient: BurgerIngredient) => void) => {
    e.preventDefault();
    if (dragState.draggedItem) {
      onDrop(dragState.draggedItem);
    }
    setDragState({
      draggedItem: null,
      isDragOver: false
    });
  }, [dragState.draggedItem]);

  // Touch event handlers for mobile support
  const handleTouchStart = useCallback((ingredient: BurgerIngredient, e: React.TouchEvent) => {
    setDragState(prev => ({
      ...prev,
      draggedItem: ingredient
    }));
  }, []);

  const handleTouchEnd = useCallback((e: React.TouchEvent, onDrop: (ingredient: BurgerIngredient) => void) => {
    if (!dragState.draggedItem) return;

    const touch = e.changedTouches[0];
    const dropElement = document.elementFromPoint(touch.clientX, touch.clientY);
    
    if (dropElement?.closest('.drop-zone')) {
      onDrop(dragState.draggedItem);
    }
    
    setDragState({
      draggedItem: null,
      isDragOver: false
    });
  }, [dragState.draggedItem]);

  return {
    dragState,
    handlers: {
      onDragStart: handleDragStart,
      onDragEnd: handleDragEnd,
      onDragOver: handleDragOver,
      onDragLeave: handleDragLeave,
      onDrop: handleDrop,
      onTouchStart: handleTouchStart,
      onTouchEnd: handleTouchEnd
    }
  };
}
