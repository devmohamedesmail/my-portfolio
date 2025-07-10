<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreClientRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'phone' => 'nullable|string|max:20',
            'email' => 'nullable|email|max:255',
            'service' => 'required|string|max:255',
            'service_start_date' => 'required|date',
            'service_end_date' => 'required|date|after_or_equal:service_start_date',
            'budget' => 'nullable|numeric|min:0',
            'description' => 'nullable|string',
            'status' => 'required|in:active,inactive,completed',
        ];
    }
}
