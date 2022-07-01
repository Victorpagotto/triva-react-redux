const questionsResponseMock = {
    response_code: 0,
    results: [
        {
            category: 'General Knowledge',
            type: 'multiple',
            difficulty: 'easy',
            question: 'On a dartboard, what number is directly opposite No. 1?',
            correct_answer: '19',
            incorrect_answers: ['20', '12', '15'],
        },
        {
            category: 'Geography',
            type: 'multiple',
            difficulty: 'easy',
            question:
                'The derisive acronym &quot;PIIGS&quot; refers to which of the following European countries and their economic statuses?',
            correct_answer: 'Portugal, Ireland, Italy, Greece, Spain',
            incorrect_answers: [
                'Poland, Iceland, Italy, Greece, Serbia',
                'Poland, Iceland, Italy, Greenland, Spain',
                'Portugal, Iceland, Ireland, Greece, Serbia',
            ],
        },
        {
            category: 'Entertainment: Music',
            type: 'multiple',
            difficulty: 'hard',
            question:
                'How many members are there in the idol group &quot;&micro;&#039;s&quot;?',
            correct_answer: '9',
            incorrect_answers: ['48', '6', '3'],
        },
        {
            category: 'Entertainment: Music',
            type: 'boolean',
            difficulty: 'easy',
            question:
                'Stevie Wonder&#039;s real name is Stevland Hardaway Morris.',
            correct_answer: 'True',
            incorrect_answers: ['False'],
        },
        {
            category: 'History',
            type: 'multiple',
            difficulty: 'easy',
            question: 'Which country was Josef Stalin born in?',
            correct_answer: 'Georgia',
            incorrect_answers: ['Russia', 'Germany', 'Poland'],
        },
    ],
};

export default questionsResponseMock;