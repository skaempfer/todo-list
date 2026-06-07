import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import Login from './Login';

describe('Login – email format validation', () => {
  const onLogin = vi.fn();

  beforeEach(() => {
    onLogin.mockClear();
    vi.stubGlobal('fetch', vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('shows an error and does not fetch when email is blank', async () => {
    render(<Login onLogin={onLogin} />);

    await userEvent.click(screen.getByRole('button', { name: /login/i }));

    expect(screen.getByRole('alert')).toHaveTextContent(/valid email/i);
    expect(fetch).not.toHaveBeenCalled();
    expect(onLogin).not.toHaveBeenCalled();
  });

  it('shows an error and does not fetch when email is malformed', async () => {
    render(<Login onLogin={onLogin} />);

    await userEvent.type(screen.getByLabelText(/email/i), 'notanemail');
    await userEvent.type(screen.getByLabelText(/password/i), 'secret');
    await userEvent.click(screen.getByRole('button', { name: /login/i }));

    expect(screen.getByRole('alert')).toHaveTextContent(/valid email/i);
    expect(fetch).not.toHaveBeenCalled();
    expect(onLogin).not.toHaveBeenCalled();
  });

  it('calls fetch with correct payload when email is valid', async () => {
    (fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ message: 'Login accepted.' }),
    });

    render(<Login onLogin={onLogin} />);

    await userEvent.type(screen.getByLabelText(/email/i), 'user@example.com');
    await userEvent.type(screen.getByLabelText(/password/i), 'secret');
    await userEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => expect(onLogin).toHaveBeenCalledOnce());

    expect(fetch).toHaveBeenCalledWith(
      'http://localhost:5044/login',
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({ email: 'user@example.com', password: 'secret' }),
      })
    );
  });

  it('displays server error message when backend returns 400', async () => {
    (fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: 'Invalid email format.' }),
    });

    render(<Login onLogin={onLogin} />);

    await userEvent.type(screen.getByLabelText(/email/i), 'user@example.com');
    await userEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() =>
      expect(screen.getByRole('alert')).toHaveTextContent('Invalid email format.')
    );
    expect(onLogin).not.toHaveBeenCalled();
  });

  it('calls onLogin when server returns 200', async () => {
    (fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ message: 'Login accepted.' }),
    });

    render(<Login onLogin={onLogin} />);

    await userEvent.type(screen.getByLabelText(/email/i), 'admin@test.org');
    await userEvent.type(screen.getByLabelText(/password/i), 'pw');
    await userEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => expect(onLogin).toHaveBeenCalledOnce());
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });
});
