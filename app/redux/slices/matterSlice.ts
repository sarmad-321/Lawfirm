import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Matter {
  matterId: number; 
  client:  { 
    name: string;
    email: string;
  },
  matterDescription: string;
  date : string 
  viewedDate : string
}

interface MatterSlice {
  matters: Matter[];
}

const initialState: MatterSlice = {
  matters: [],
};

export const matterSlice = createSlice({ // Changed from authSlice to matterSlice
  name: 'matter', // 
  initialState,
  reducers: {
    // Add a new matter
    addMatter: (state, action: PayloadAction<Matter>) => {
      state.matters.push(action.payload);
    },
    
    // Remove a matter by ID
    removeMatter: (state, action: PayloadAction<number>) => {
      state.matters = state.matters.filter(
        matter => matter.matterId !== action.payload
      );
    },
    
    // Update an existing matter
    updateMatter: (state, action: PayloadAction<Matter>) => {
      const index = state.matters.findIndex(
        matter => matter.matterId === action.payload.matterId
      );
      if (index !== -1) {
        state.matters[index] = action.payload;
      }
    },
    
    // Set all matters (useful for loading from API)
    setMatters: (state, action: PayloadAction<Matter[]>) => {
      state.matters = action.payload;
    },
    
    // Clear all matters
    clearMatters: (state) => {
      state.matters = [];
    },
  },
});

export const { 
  addMatter, 
  removeMatter, 
  updateMatter, 
  setMatters, 
  clearMatters 
} = matterSlice.actions;

export default matterSlice.reducer;