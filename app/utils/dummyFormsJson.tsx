export const NoteFormJson = [
  { key: 'subject', label: 'Subject', type: 'input', value: '' },
  { key: 'heading', label: 'Note Details', type: 'heading', value: '' },
  { key: 'date', label: 'Date', type: 'dropdown', value: 'Today, Aug 27' },
  {
    key: 'fileNoteTo',
    label: 'File note to',
    type: 'status',
    value: '',
    options: [
      { label: 'Matter', value: 'matter' },
      { label: 'Contact', value: 'contact' },
    ],
  },
  { key: 'contact', label: 'Contact', type: 'dropdown', value: '' },
];

export const eventFormJson = [
  {
    key: 'title',
    label: 'Event title',
    type: 'input',
    placeholder: 'Enter title',
    required: true,
    value: '',
  },
  {
    key: 'description',
    label: 'Description',
    type: 'input',
    placeholder: 'Enter description',
    value: '',
  },
  {
    key: 'assignedTo',
    label: 'Assigned to',
    type: 'dropdown',
    value: 'paul walker',
    options: ['Paul Walker', 'John Wick', 'Jane Doe'],
  },
  {
    key: 'privateTask',
    label: 'Private Task',
    type: 'switch',
    description:
      'When Enabled, only you and administration users can view or edit this task',
    value: false,
  },
  {
    key: 'matter',
    label: 'Matter',
    type: 'dropdown',
    value: '',
    options: ['Matter A', 'Matter B', 'Matter C'],
  },
  {
    key: 'dueDate',
    label: 'Due date',
    type: 'dropdown',
    value: '',
    options: ['Today', 'Tomorrow', 'Next Week'],
  },
  {
    key: 'priorityLevel',
    label: 'Priority Level',
    type: 'status',
    value: '',
    options: [
      { label: 'Low', value: 'low' },
      { label: 'Medium', value: 'medium' },
      { label: 'High', value: 'high' },
    ],
  },
  {
    key: 'taskType',
    label: 'Task Type',
    type: 'dropdown',
    value: '',
    options: ['Bug', 'Feature', 'Improvement'],
  },
  {
    key: 'priorityLevel2',
    label: 'Priority Level',
    type: 'status',
    value: '',
    options: [
      { label: 'Urgent', value: 'urgent' },
      { label: 'Normal', value: 'normal' },
      { label: 'Low', value: 'low' },
    ],
  },
  {
    key: 'timeEstimate',
    label: 'Time estimate',
    type: 'input',
    placeholder: 'Ex. 1h 12m, 1:12',
    value: '',
  },
  {
    key: 'reminders',
    label: 'Reminders',
    type: 'dropdown',
    value: '',
    options: ['10 min before', '30 min before', '1 hour before'],
  },
];

export const emailLogsFormJson = [
  {
    key: 'from',
    label: 'Sent From',
    type: 'dropdown',
    value: 'Select senders',
  },
  { key: 'to', label: 'Sent to', type: 'dropdown', value: 'Select recipients' },

  {
    key: 'contact',
    label: 'Subject',
    type: 'input',
    value: '',
    placeholder: 'Enter subject',
  },
  {
    key: 'body',
    label: 'What was the call about?',
    type: 'input',
    value: '',
    placeholder: 'Enter body',
  },
  { key: 'matter', label: 'Matter', type: 'dropdown', value: 'Select matter' },
  {
    key: 'date',
    label: 'Date and time',
    type: 'dropdown',
    value: 'Today, Aug 27',
  },
];

export const phoneLogsFormJson = [
  {
    key: 'from',
    label: 'Call From',
    type: 'dropdown',
    value: 'Select Callers',
  },
  { key: 'to', label: 'Call to', type: 'dropdown', value: 'Select recipients' },

  {
    key: 'contact',
    label: 'Subject',
    type: 'input',
    value: '',
    placeholder: 'Enter subject',
  },
  {
    key: 'body',
    label: 'Body',
    type: 'input',
    value: '',
    placeholder: 'Enter body',
  },
  { key: 'matter', label: 'Matter', type: 'dropdown', value: 'Select matter' },
  {
    key: 'date',
    label: 'Date and time',
    type: 'dropdown',
    value: 'Today, Aug 27',
  },
];

export const messageFormJson = [
  { key: 'matter', label: 'Matter', type: 'dropdown', value: 'Select matter' },
  { key: 'to', label: 'Send to', type: 'dropdown', value: 'soft tech' },

  {
    key: 'subject',
    label: 'Message subject',
    type: 'input',
    value: '',
    placeholder: 'Enter subject',
    required: true,
  },
  {
    key: 'body',
    label: 'Message',
    type: 'input',
    value: '',
    placeholder: 'Enter Message',
    required: true,
  },
];
