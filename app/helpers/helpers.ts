export const displayValidationIcon = (
    error: string | undefined,
    touched: boolean | undefined,
    value: string): 'none' | 'flex' => {
    // if (!error && !touched) return 'none';
    if (error && !touched) return 'none';
    return (error && touched) || value === '' ? 'none' : 'flex';
}

