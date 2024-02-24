export const userSchema = [
    {
        name: 'First Name',
        key: 'fname',
        type: 'text',
        min: 1,
        max: 50,
        regex: '^[A-Za-z\\s\\-\\\'.]{1,50}$',
        required: true
    },
    {
        name: 'Last Name',
        key: 'lname',
        type: 'text',
        min: 1,
        max: 50,
        regex: '^[A-Za-z\\s\\-\\\'.]{1,50}$',
        required: true
    },
    {
        name: 'Email',
        key: 'email',
        type: 'email',
        min: 5,
        max: 50,
        regex: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$',
        required: true
    },
    {
        name: 'Phone Number',
        key: 'phone',
        type: 'text',
        min: 10,
        max: 12,
        regex: '^\\+?[0-9]{10,12}$',
        required: true
    },
    {
        name: 'Address',
        key: 'addr',
        type: 'text',
        min: 5,
        max: 72,
        regex: '^[a-zA-Z0-9\\s,\'\\-.]{5,72}$',
        required: true
    },
    {
        name: 'City',
        key: 'city',
        type: 'text',
        min: 2,
        max: 20,
        regex: '^[A-Za-z\\s\\-\\\'.]{2,20}$',
        required: true
    },
    {
        name: 'State',
        key: 'state',
        type: 'text',
        min: 2,
        max: 2,
        regex: '^[A-Za-z]{2}$',
        required: true
    },
    {
        name: 'Zip Code',
        key: 'zip',
        type: 'text',
        min: 1,
        max: 50,
        regex: '^[A-Za-z0-9]{5,6}?$',
        required: true
    },
    {
        name: 'Occupation',
        key: 'occupation',
        type: 'text',
        min: 2,
        max: 20,
        regex: '^[A-Za-z\\s\\-\\\'.]{2,20}$',
        required: false
    },
    {
        name: 'Country',
        key: 'country',
        type: 'text',
        min: 2,
        max: 20,
        regex: '^[A-Za-z\\s\\-\\\'.]{2,20}$',
        required: false
    },
];
