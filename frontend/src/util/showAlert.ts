import Swal from "sweetalert2";

const showAlert = (
    title: string,
    text: string,
    icon: 'success' | 'error' | 'warning' | 'info' | 'question',  // Define possible values for icon
    confirmButtonText: string
) => {
    Swal.fire({
        title: title,
        text: text,
        icon: icon,
        confirmButtonText: confirmButtonText,
        width: '600px',
        // timer: 2000, // Auto-close after 3 seconds
        // timerProgressBar: true,  // Show a progress bar that counts down

    });
};

export default showAlert