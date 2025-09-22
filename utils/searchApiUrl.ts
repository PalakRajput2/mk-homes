type Tprops = {
    path: string;

    size: number;
    skip: number;
    search: string;
    sorting?: string;
    trashOnly?: string;
    additionalPath?: string;
}

export function searchApiUrl({ path, additionalPath = "/list", size, skip, search = "", sorting = "", trashOnly }: Tprops) {
    const params = new URLSearchParams({
        size: String(size),
        skip: String(skip)
    });

    const optionalParams = {
        search: search.trim(),
        sorting,
        trashOnly: trashOnly ? String(trashOnly) : undefined
    };

    Object.entries(optionalParams).forEach(([key, value]) => {
        if (value) params.append(key, value);
    });

    return `${path}${additionalPath}?${params.toString()}`;
}