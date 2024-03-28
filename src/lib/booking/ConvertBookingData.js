export function convertBookingToTableForm(data) {
  const convertedArray = data.map((process) => {
    return {
      id: process.id,
      title: process.book.title,
      book_code: process.book.book_code,
      dewey_decimal_category_range: process.book.dewey_decimal_category_range,
      dewey_decimal_number: process.book.dewey_decimal_number,
      student: `${process.user.first_name} ${process.user.last_name}`,
      status: process.isBooked ? "Booked" : "Pending",
      cover_image: process.book.cover_image,
    };
  });

  return convertedArray;
}
