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

export const taskOptionsForm = [
  { key: 'by', label: 'Assigned by', type: 'dropdown', value: 'kim john' },
  {
    key: 'to',
    label: 'Assigned to',
    type: 'dropdown',
    value: 'sarmad shakeel',
  },
  { key: 'matter', label: 'Matter', type: 'dropdown', value: 'Select matter' },

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
  {
    key: 'status',
    label: 'Task Status',
    type: 'dropdown',
    value: '',
    options: ['All', 'Pending', 'In Progress', 'Completed'],
  },
  {
    key: 'priorityLevel',
    label: 'Priority Level',
    type: 'status',
    value: '',
    options: [
      { label: 'All', value: 'all' },
      { label: 'High', value: 'high' },
      { label: 'Normal', value: 'normal' },
      { label: 'Low', value: 'low' },
    ],
  },
  {
    key: 'type',
    label: 'Task type',
    type: 'status',
    value: 'All task types',
    options: [
      { label: 'All', value: 'all' },
      { label: 'Pending', value: 'Pending' },
      { label: 'In Progress', value: 'In Progress' },
      { label: 'Completed', value: 'Completed' },
    ],
  },
  {
    key: 'Task viewing permissions',
    label: 'Priority level',
    type: 'status',
    value: '',
    options: [
      { label: 'All', value: 'all' },
      { label: 'Private Only', value: 'private' },
    ],
  },
];

export const matterOptionsForm = [
  {
    key: 'client',
    label: 'Client',
    type: 'dropdown',
    value: 'All clients',
  },
  {
    key: 'responsibleAttorney',
    label: 'Responsible Attorney',
    type: 'dropdown',
    value: 'All firm users',
  },
  {
    key: 'originatingAttorney',
    label: 'Originating Attorney',
    type: 'dropdown',
    value: 'All firm users',
  },
  {
    key: 'billableStatus',
    label: 'Billable status',
    type: 'status',
    value: 'all',
    options: [
      { label: 'All', value: 'all' },
      { label: 'Billable', value: 'billable' },
      { label: 'Non-billable', value: 'non-billable' },
    ],
  },
  {
    key: 'practiceArea',
    label: 'Practice area',
    type: 'dropdown',
    value: 'All practice areas',
  },
];

export const contactGeneralDetailsForm = [
  {
    key: 'prefix',
    label: 'Prefix',
    type: 'input',
    value: '',
    placeholder: 'Ex. Mr, Mrs, Dr...',
  },
  {
    key: 'firstName',
    label: 'First name',
    type: 'input',
    value: '',
    placeholder: 'Enter first name...',
    required: true,
  },
  {
    key: 'middleName',
    label: 'Middle name',
    type: 'input',
    value: '',
    placeholder: 'Enter middle name...',
  },
  {
    key: 'lastName',
    label: 'Last name',
    type: 'input',
    value: '',
    placeholder: 'Enter last name...',
    required: true,
  },
  {
    key: 'dob',
    label: 'Date of birth',
    type: 'date',
    value: '',
    placeholder: 'Select date',
  },
  {
    key: 'company',
    label: 'Company',
    type: 'dropdown',
    value: '',
    placeholder: 'Select company',
  },
  {
    key: 'title',
    label: 'Title',
    type: 'input',
    value: '',
    placeholder: 'Enter title...',
  },
];

export const activityFiltersForm = [
  {
    key: 'firmUser',
    label: 'Firm user',
    type: 'dropdown',
    value: 'paul walker',
  },
  {
    key: 'matter',
    label: 'Matter',
    type: 'dropdown',
    value: 'All matters',
  },
  {
    key: 'dateRange',
    label: 'Date range',
    type: 'status',
    value: 'allTime',
    options: [
      { label: 'All time', value: 'allTime' },
      { label: 'Today', value: 'today' },
      { label: 'This week', value: 'thisWeek' },
    ],
  },
  {
    key: 'timeEntryCategory',
    label: 'Time entry category',
    type: 'dropdown',
    value: 'All time entry categories',
  },
  {
    key: 'invoiceStatus',
    label: 'Invoice status',
    type: 'status',
    value: 'all',
    options: [
      { label: 'All', value: 'all' },
      { label: 'Billed', value: 'billed' },
      { label: 'Draft', value: 'draft' },
    ],
  },
];

export const timeEntryForm = [
  {
    key: 'duration',
    label: 'Duration',
    type: 'input',
    value: '',
    placeholder: 'Ex. 1h 12m, 1:12...',
  },
  {
    key: 'matter',
    label: 'Matter',
    type: 'dropdown',
    value: '00001-wick',
    description: 'Murder case',
  },
  {
    key: 'timeEntryCategory',
    label: 'Time entry category',
    type: 'dropdown',
    value: 'Select time entry category',
  },
  {
    key: 'description',
    label: 'Description',
    type: 'input',
    value: '',
    placeholder: 'Enter description',
  },
  {
    key: 'date',
    label: 'Date',
    type: 'date',
    value: 'Today, Aug 25',
  },
  {
    key: 'firmUser',
    label: 'Firm user',
    type: 'dropdown',
    value: 'paul walker',
  },
  {
    key: 'rate',
    label: 'Rate (hourly)',
    type: 'input',
    value: '0.00',
    description: 'Default rate',
  },
];
