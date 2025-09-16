import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Contact {
  contactId: number;
  contactType: string; // personal | company
  generalDetails: {
    [key: string]: any; // dynamic keys from FormGenerator (e.g., firstName, lastName, etc.)
  };
  emails: string[];
  phones: string[];
  createdAt: string;
}

interface ContactSlice {
  contacts: Contact[];
}

const initialState: ContactSlice = {
  contacts: [],
};

export const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {
    // Add a new contact
    addContact: (state, action: PayloadAction<Contact>) => {
      state.contacts.push(action.payload);
    },

    // Remove a contact by ID
    removeContact: (state, action: PayloadAction<number>) => {
      state.contacts = state.contacts.filter(
        contact => contact.contactId !== action.payload
      );
    },

    // Update an existing contact
    updateContact: (state, action: PayloadAction<Contact>) => {
      const index = state.contacts.findIndex(
        contact => contact.contactId === action.payload.contactId
      );
      if (index !== -1) {
        state.contacts[index] = action.payload;
      }
    },

    // Set all contacts (useful for loading from API)
    setContacts: (state, action: PayloadAction<Contact[]>) => {
      state.contacts = action.payload;
    },

    // Clear all contacts
    clearContacts: state => {
      state.contacts = [];
    },
  },
});

export const {
  addContact,
  removeContact,
  updateContact,
  setContacts,
  clearContacts,
} = contactSlice.actions;

export default contactSlice.reducer;
