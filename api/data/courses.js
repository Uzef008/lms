const courses = [
    {
        title: 'The Complete Java Programming Course',
        description: 'Master Java basics to advanced concepts and build real applications.',
        instructor: 'John Doe',
        category: 'Java',
        price: 49.99,
        thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=60',
        rating: 4.8,
        numOfReviews: 1200,
        isFree: false,
        curriculum: [{ title: 'Introduction', length: '1h' }, { title: 'OOP Concepts', length: '3h' }]
    },
    {
        title: 'Python for Data Science and Machine Learning',
        description: 'Comprehensive guide to Python data analysis, visualization, and ML.',
        instructor: 'Jane Smith',
        category: 'Python',
        price: 59.99,
        thumbnail: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=60',
        rating: 4.9,
        numOfReviews: 3200,
        isFree: false,
        curriculum: [{ title: 'Python Crash Course', length: '2h' }, { title: 'Pandas & NumPy', length: '4h' }]
    },
    {
        title: 'Modern HTML & CSS From The Beginning',
        description: 'Build responsive websites with HTML5 and CSS3 without frameworks.',
        instructor: 'Brad Traversy',
        category: 'Web Development',
        price: 0,
        thumbnail: 'https://images.unsplash.com/photo-1621839673705-6617adf9e890?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=60',
        rating: 4.7,
        numOfReviews: 850,
        isFree: true,
        curriculum: [{ title: 'HTML Basics', length: '1h' }, { title: 'CSS Layouts', length: '2h' }]
    },
    {
        title: 'The Complete SQL Database Course',
        description: 'Learn SQL from scratch for databases like MySQL, PostgreSQL, and SQL Server.',
        instructor: 'David M.',
        category: 'Database',
        price: 29.99,
        thumbnail: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=60',
        rating: 4.6,
        numOfReviews: 430,
        isFree: false,
        curriculum: [{ title: 'Intro to SQL', length: '1h' }, { title: 'Advanced Queries', length: '3h' }]
    },
    {
        title: 'Advanced JavaScript Concepts',
        description: 'Deep dive into closures, prototypes, async programming and more.',
        instructor: 'Andrei Neagoie',
        category: 'JavaScript',
        price: 39.99,
        thumbnail: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=60',
        rating: 4.9,
        numOfReviews: 2100,
        isFree: false,
        curriculum: [{ title: 'JS Engine', length: '2h' }, { title: 'Asynchronous JS', length: '2h' }]
    },
    {
        title: 'React Fundamentals to Advanced',
        description: 'Hooks, Context API, Redux Toolkit, and Next.js.',
        instructor: 'Maximilian B.',
        category: 'React Development',
        price: 0,
        thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=60',
        rating: 4.8,
        numOfReviews: 5400,
        isFree: true,
        curriculum: [{ title: 'React Basics', length: '4h' }, { title: 'Hooks Deep Dive', length: '5h' }]
    }
];

module.exports = courses;
