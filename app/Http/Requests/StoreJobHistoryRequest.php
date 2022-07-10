<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreJobHistoryRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'user_id'       => ['required', 'numeric', 'exists:users,id'],
            'company_name'  => ['required', 'string', 'max:50'],
            'job_title'     => ['required', 'string', 'max:50'],
            'description'   => ['required', 'string'],
            'job_type_id'   => ['required', 'numeric', 'exists:job_types,id'],
            'start_salary'  => ['required', 'numeric', 'gte:0'],
            'end_salary'    => ['required', 'numeric', 'gte:0'],
            'start_date'    => ['required', 'date'],
            'end_date'      => ['required', 'date', 'after:start_date'],
        ];
    }
}
