import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('FER202 Assignment - Motorbike Rental Website Tests', () => {
  beforeEach(() => {
    localStorage.clear();
    window.history.pushState({}, 'Test', '/');
  });

  test('1. / - Displays Home page with branding and featured bikes', () => {
    window.history.pushState({}, 'Test', '/');
    render(<App />);

    expect(screen.getAllByText(/Moto/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/Rental/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText(/Thuê Xe Máy Dễ Dàng/i)).toBeInTheDocument();
    expect(screen.getByText(/Tại Sao Nên Chọn MotoRental/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /tìm xe ngay/i })).toBeInTheDocument();
  });

  test('2. /bikes - Displays motorbike list with prices per day', () => {
    window.history.pushState({}, 'Test', '/bikes');
    render(<App />);

    expect(screen.getByText(/Danh Sách Xe Máy Cho Thuê/i)).toBeInTheDocument();
    expect(screen.getByText('Honda Vision 110cc')).toBeInTheDocument();
    expect(screen.getByText('Honda Air Blade 160cc')).toBeInTheDocument();
    expect(screen.getByText('Honda Wave Alpha 110cc')).toBeInTheDocument();
    expect(screen.getByText('130.000₫/ngày')).toBeInTheDocument();
  });

  test('3. /bikes?keyword=Vision - Searches motorbikes by name', () => {
    window.history.pushState({}, 'Test', '/bikes?keyword=Vision');
    render(<App />);

    expect(screen.getByText('Honda Vision 110cc')).toBeInTheDocument();
    expect(screen.queryByText('Yamaha Exciter 155 VVA')).not.toBeInTheDocument();
    expect(screen.queryByText('Honda Wave Alpha 110cc')).not.toBeInTheDocument();
  });

  test('4. /bikes?category=Xe%20số - Filters motorbikes by category', () => {
    window.history.pushState({}, 'Test', '/bikes?category=Xe%20số');
    render(<App />);

    expect(screen.getByText('Honda Wave Alpha 110cc')).toBeInTheDocument();
    expect(screen.getByText('Yamaha Sirius Fi 115cc')).toBeInTheDocument();
    expect(screen.queryByText('Honda Vision 110cc')).not.toBeInTheDocument();
  });

  test('5. /bikes/1 - Displays motorbike details and specifications', () => {
    window.history.pushState({}, 'Test', '/bikes/1');
    render(<App />);

    expect(screen.getByRole('heading', { level: 1, name: 'Honda Vision 110cc' })).toBeInTheDocument();
    expect(screen.getByText('130.000₫/ngày')).toBeInTheDocument();
    expect(screen.getByText(/Dung tích xi lanh:/i)).toBeInTheDocument();
    expect(screen.getByText('110cc')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /thêm vào danh sách thuê/i })).toBeInTheDocument();
  });

  test('6. Adding a bike to rental updates the header badge', () => {
    window.history.pushState({}, 'Test', '/bikes');
    render(<App />);

    const rentButtons = screen.getAllByRole('button', { name: /\+ chọn thuê/i });
    expect(rentButtons.length).toBeGreaterThan(0);

    // Click to add first bike (Honda Vision 110cc)
    fireEvent.click(rentButtons[0]);

    // Badge should show 1
    const cartBadge = screen.getByText('1');
    expect(cartBadge).toBeInTheDocument();
  });

  test('7. /rental-list - Displays rented bikes and calculates total price', () => {
    // Preset localStorage with 2 bikes
    const initialCart = [
      {
        id: 1,
        name: 'Honda Vision 110cc',
        category: 'Xe tay ga',
        engine: '110cc',
        pricePerDay: 130000,
        days: 2,
        image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc'
      },
      {
        id: 3,
        name: 'Honda Wave Alpha 110cc',
        category: 'Xe số',
        engine: '110cc',
        pricePerDay: 100000,
        days: 3,
        image: 'https://images.unsplash.com/photo-1599819811279-d5ad9cccf838'
      }
    ];
    localStorage.setItem('motorbike_rental_cart', JSON.stringify(initialCart));

    window.history.pushState({}, 'Test', '/rental-list');
    render(<App />);

    // Honda Vision: 130k * 2 = 260k
    // Wave Alpha: 100k * 3 = 300k
    // Total = 560.000₫
    expect(screen.getByText('Honda Vision 110cc')).toBeInTheDocument();
    expect(screen.getByText('Honda Wave Alpha 110cc')).toBeInTheDocument();
    expect(screen.getByText('260.000₫')).toBeInTheDocument();
    expect(screen.getByText('300.000₫')).toBeInTheDocument();
    expect(screen.getByText('560.000₫')).toBeInTheDocument();
  });

  test('8. /rental-list - Removes a bike from rental list and updates total', () => {
    const initialCart = [
      {
        id: 1,
        name: 'Honda Vision 110cc',
        category: 'Xe tay ga',
        pricePerDay: 130000,
        days: 1,
        image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc'
      },
      {
        id: 2,
        name: 'Honda Air Blade 160cc',
        category: 'Xe tay ga',
        pricePerDay: 170000,
        days: 1,
        image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87'
      }
    ];
    localStorage.setItem('motorbike_rental_cart', JSON.stringify(initialCart));

    window.history.pushState({}, 'Test', '/rental-list');
    render(<App />);

    expect(screen.getByText('Honda Vision 110cc')).toBeInTheDocument();
    expect(screen.getByText('Honda Air Blade 160cc')).toBeInTheDocument();

    // Click delete on first bike
    const deleteButtons = screen.getAllByTitle(/xóa xe này khỏi danh sách thuê/i);
    fireEvent.click(deleteButtons[0]);

    // Honda Vision should be removed
    expect(screen.queryByText('Honda Vision 110cc')).not.toBeInTheDocument();
    expect(screen.getByText('Honda Air Blade 160cc')).toBeInTheDocument();
    // Total should now be 170.000₫
    expect(screen.getAllByText('170.000₫').length).toBeGreaterThanOrEqual(1);
  });

  test('9. /bikes/999 - Handles nonexistent bike ID gracefully', () => {
    window.history.pushState({}, 'Test', '/bikes/999');
    render(<App />);

    expect(screen.getByText(/Xe máy không tồn tại/i)).toBeInTheDocument();
    expect(screen.getByText(/999/)).toBeInTheDocument();
  });

  test('10. /invalid-route - Displays 404 Not Found page', () => {
    window.history.pushState({}, 'Test', '/invalid-route');
    render(<App />);

    expect(screen.getByText('404 - Không tìm thấy trang')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /về trang chủ/i })).toBeInTheDocument();
  });
});
