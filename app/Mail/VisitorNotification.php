<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class VisitorNotification extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    public $visitorData;
    public $visitorStats;

    /**
     * Create a new message instance.
     */
    public function __construct(array $visitorData, array $visitorStats = [])
    {
        $this->visitorData = $visitorData;
        $this->visitorStats = $visitorStats;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: '🌟 New Visitor Alert - Someone Visited Your Portfolio!',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'emails.visitor-notification',
            with: [
                'visitorData' => $this->visitorData,
                'visitorStats' => $this->visitorStats,
            ]
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
