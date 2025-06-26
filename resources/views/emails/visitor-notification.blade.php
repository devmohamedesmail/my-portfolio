<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Visitor Alert</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f4f4f4;
            margin: 0;
            padding: 20px;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background: white;
            border-radius: 10px;
            box-shadow: 0 0 20px rgba(0,0,0,0.1);
            overflow: hidden;
        }
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px 20px;
            text-align: center;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
        }
        .content {
            padding: 30px 20px;
        }
        .visitor-info {
            background: #f8f9fa;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
        }
        .info-row {
            display: flex;
            justify-content: space-between;
            margin: 10px 0;
            padding: 8px 0;
            border-bottom: 1px solid #eee;
        }
        .info-row:last-child {
            border-bottom: none;
        }
        .label {
            font-weight: bold;
            color: #555;
        }
        .value {
            color: #333;
            text-align: right;
        }
        .stats-section {
            background: #e3f2fd;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
        }
        .stats-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px;
            margin-top: 15px;
        }
        .stat-item {
            text-align: center;
            background: white;
            padding: 15px;
            border-radius: 6px;
        }
        .stat-number {
            font-size: 24px;
            font-weight: bold;
            color: #1976d2;
        }
        .stat-label {
            font-size: 12px;
            color: #666;
            margin-top: 5px;
        }
        .footer {
            background: #f8f9fa;
            padding: 20px;
            text-align: center;
            color: #666;
            font-size: 14px;
        }
        .emoji {
            font-size: 20px;
        }
        @media (max-width: 600px) {
            .info-row {
                flex-direction: column;
            }
            .value {
                text-align: left;
                margin-top: 5px;
            }
            .stats-grid {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🌟 New Portfolio Visitor!</h1>
            <p>Someone just visited your website</p>
        </div>

        <div class="content">
            <p>Hello Mohamed,</p>
            <p>Great news! You have a new visitor on your portfolio website. Here are the details:</p>

            <div class="visitor-info">
                <h3>👤 Visitor Information</h3>
                
                <div class="info-row">
                    <span class="label">🌐 IP Address:</span>
                    <span class="value">{{ $visitorData['ip_address'] }}</span>
                </div>

                @if($visitorData['country'])
                <div class="info-row">
                    <span class="label">🌍 Location:</span>
                    <span class="value">
                        {{ $visitorData['city'] ?? 'Unknown' }}, {{ $visitorData['country'] }}
                    </span>
                </div>
                @endif

                @if($visitorData['browser'])
                <div class="info-row">
                    <span class="label">🌐 Browser:</span>
                    <span class="value">{{ $visitorData['browser'] }}</span>
                </div>
                @endif

                @if($visitorData['device'])
                <div class="info-row">
                    <span class="label">📱 Device:</span>
                    <span class="value">{{ $visitorData['device'] }}</span>
                </div>
                @endif

                @if($visitorData['operating_system'])
                <div class="info-row">
                    <span class="label">💻 OS:</span>
                    <span class="value">{{ $visitorData['operating_system'] }}</span>
                </div>
                @endif

                @if($visitorData['referrer'])
                <div class="info-row">
                    <span class="label">🔗 Referrer:</span>
                    <span class="value">{{ $visitorData['referrer'] }}</span>
                </div>
                @endif

                <div class="info-row">
                    <span class="label">⏰ Visit Time:</span>
                    <span class="value">{{ $visitorData['visited_at'] }}</span>
                </div>
            </div>

            @if(!empty($visitorStats))
            <div class="stats-section">
                <h3>📊 Today's Statistics</h3>
                <div class="stats-grid">
                    <div class="stat-item">
                        <div class="stat-number">{{ $visitorStats['today_unique_visitors'] ?? 0 }}</div>
                        <div class="stat-label">Unique Visitors Today</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-number">{{ $visitorStats['today_total_visits'] ?? 0 }}</div>
                        <div class="stat-label">Total Visits Today</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-number">{{ $visitorStats['total_visitors'] ?? 0 }}</div>
                        <div class="stat-label">Total Unique Visitors</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-number">{{ $visitorStats['total_visits'] ?? 0 }}</div>
                        <div class="stat-label">All Time Visits</div>
                    </div>
                </div>
            </div>
            @endif

            <p>Keep up the great work on your portfolio! 🚀</p>
        </div>

        <div class="footer">
            <p>This email was automatically sent when someone visited your portfolio website.</p>
            <p>© {{ date('Y') }} Mohamed Esmail Portfolio</p>
        </div>
    </div>
</body>
</html>
