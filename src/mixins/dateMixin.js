export default {
    methods: {
      formatDate(dateString) {
        if (dateString === '') {
          return '';
        }
        const options = { month: 'short', day: 'numeric' };
        const date = new Date(dateString);
        const formattedDate = date.toLocaleDateString('en-GB', options);

        const day = formattedDate.split(' ')[0];
        const month = date.toLocaleString('en-GB', { month: 'long' });

        return `${month} ${day}`;
      }
    }
  }
  