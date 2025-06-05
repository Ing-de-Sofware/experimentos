import { Message } from './message';

describe('Message Interface', () => {
  it('should create a valid message object', () => {
    const testMessage: Message = {
      id: 1,
      from: 'alice@example.com',
      to: 'bob@example.com',
      content: 'Hello Bob!',
      timestamp: new Date().toISOString()
    };

    expect(testMessage).toBeTruthy();
    expect(testMessage.content).toBe('Hello Bob!');
    expect(testMessage.from).toContain('@');
  });

  it('should support arrays of messages', () => {
    const messages: Message[] = [
      {
        id: 1,
        from: 'a@example.com',
        to: 'b@example.com',
        content: 'First message',
        timestamp: new Date().toISOString()
      },
      {
        id: 2,
        from: 'b@example.com',
        to: 'a@example.com',
        content: 'Reply',
        timestamp: new Date().toISOString()
      }
    ];

    expect(messages.length).toBe(2);
    expect(messages[1].content).toContain('Reply');
  });

  it('should sort messages by timestamp ascending', () => {
    const messages: Message[] = [
      {
        id: 1,
        from: 'x@example.com',
        to: 'y@example.com',
        content: 'Later message',
        timestamp: '2025-06-05T10:00:00Z'
      },
      {
        id: 2,
        from: 'x@example.com',
        to: 'y@example.com',
        content: 'Earlier message',
        timestamp: '2025-06-04T10:00:00Z'
      }
    ];

    const sorted = messages.sort(
      (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    );

    expect(sorted[0].content).toBe('Earlier message');
  });

  it('should have valid email addresses for from and to fields', () => {
    const message: Message = {
      id: 3,
      from: 'sender@example.com',
      to: 'receiver@example.com',
      content: 'Checking emails',
      timestamp: new Date().toISOString()
    };

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    expect(emailRegex.test(message.from)).toBeTrue();
    expect(emailRegex.test(message.to)).toBeTrue();
  });
});
