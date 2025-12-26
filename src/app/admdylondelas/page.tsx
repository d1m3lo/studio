
'use client';

import { useState, type FormEvent, useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { ShieldCheck, ShieldAlert, LayoutGrid, PlusCircle, MoreHorizontal, File, ListFilter, Upload, Trash2, Edit } from 'lucide-react';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarTrigger
} from '@/components/ui/sidebar';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Image from 'next/image';
import type { Product } from '@/lib/products';
import { products as initialProducts } from '@/lib/products';
import { Badge } from '@/components/ui/badge';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogClose,
} from "@/components/ui/dialog"
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

function AdminHeader() {
    return (
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <SidebarTrigger className="shrink-0" />
          <div className="w-full flex-1">
            {/* Pode adicionar uma barra de busca ou outros elementos aqui */}
          </div>
        </header>
    )
}

const detailedCategories = {
    'Calçados': {
        genders: ['Masculino', 'Feminino', 'Unissex'],
        subcategories: {
            'Sneakers': ['Masculino', 'Feminino', 'Unissex'],
            'Casual': ['Masculino', 'Feminino', 'Unissex'],
            'Esportivo': ['Masculino', 'Feminino', 'Unissex'],
            'Streetwear': ['Masculino', 'Feminino', 'Unissex'],
            'Chinelo': ['Masculino', 'Feminino', 'Unissex'],
            'Sandália': ['Feminino'],
            'Bota': ['Masculino', 'Feminino', 'Unissex'],
        }
    },
    'Roupas': {
        genders: ['Masculino', 'Feminino', 'Unissex'],
        subcategories: {
            'Camisetas': ['Masculino', 'Feminino', 'Unissex'],
            'Moletons': ['Masculino', 'Feminino', 'Unissex'],
            'Calças': ['Masculino', 'Feminino', 'Unissex'],
            'Jaquetas': ['Masculino', 'Feminino', 'Unissex'],
            'Vestidos': ['Feminino'],
            'Streetwear': ['Masculino', 'Feminino', 'Unissex'],
            'Camisa de time': ['Masculino', 'Unissex'],
        }
    },
    'Acessórios': {
        genders: ['Masculino', 'Feminino', 'Unissex'],
        subcategories: {
            'Bonés e Gorros': ['Masculino', 'Feminino', 'Unissex'],
            'Mochilas e Bolsas': ['Masculino', 'Feminino', 'Unissex'],
            'Relógios': ['Masculino', 'Feminino', 'Unissex'],
            'Óculos': ['Masculino', 'Feminino', 'Unissex'],
        }
    },
    'Perfumes': {
        genders: ['Masculino', 'Feminino', 'Unissex'],
        subcategories: {
            'Masculino': ['Masculino'],
            'Feminino': ['Feminino'],
            'Unissex': ['Unissex'],
            'Importados': ['Masculino', 'Feminino', 'Unissex'],
        }
    },
};

type Category = keyof typeof detailedCategories;
type Gender = 'Masculino' | 'Feminino' | 'Unissex';


function AddProductDialog({ onAddProduct }: { onAddProduct: (newProduct: any) => void }) {
    const { toast } = useToast();
    
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [oldPrice, setOldPrice] = useState('');
    const [brand, setBrand] = useState('');
    const [description, setDescription] = useState('');
    const [imageUrls, setImageUrls] = useState(['']);
    const [colors, setColors] = useState([{ name: '', hex: '' }]);
    const [sizes, setSizes] = useState('');
    const [subcategory, setSubcategory] = useState('');

    const [selectedGenders, setSelectedGenders] = useState<Gender[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<Category | ''>('');
    const [isOpen, setIsOpen] = useState(false);

    const availableCategories = useMemo(() => {
        if (selectedGenders.length === 0) return Object.keys(detailedCategories);
        
        return Object.entries(detailedCategories)
            .filter(([_, details]) => 
                selectedGenders.some(gender => details.genders.includes(gender))
            )
            .map(([categoryName]) => categoryName);

    }, [selectedGenders]);

    const availableSubcategories = useMemo(() => {
        if (!selectedCategory) return [];
        
        const categoryDetails = detailedCategories[selectedCategory as Category];
        if (!categoryDetails) return [];
        
        if (selectedGenders.length === 0) {
            return Object.keys(categoryDetails.subcategories);
        }
        
        return Object.entries(categoryDetails.subcategories)
            .filter(([_, subGenders]) =>
                 selectedGenders.some(gender => subGenders.includes(gender))
            )
            .map(([subCategoryName]) => subCategoryName);

    }, [selectedCategory, selectedGenders]);

    const handleGenderChange = (gender: Gender, checked: boolean) => {
        setSelectedGenders(prev => {
            const newGenders = checked ? [...prev, gender] : prev.filter(g => g !== gender);
            
            if (!availableCategories.includes(selectedCategory)) {
                 setSelectedCategory('');
            }
            return newGenders;
        });
    };
    
    useEffect(() => {
        if (selectedCategory && !availableCategories.includes(selectedCategory)) {
            setSelectedCategory('');
            setSubcategory('');
        }
    }, [availableCategories, selectedCategory]);

    useEffect(() => {
        setSubcategory('');
    }, [selectedCategory]);

    const handleCategoryChange = (value: string) => {
        setSelectedCategory(value as Category);
    };

    const handleAddImageUrl = () => {
        setImageUrls([...imageUrls, '']);
    };

    const handleRemoveImageUrl = (index: number) => {
        if (imageUrls.length > 1) {
            const newImageUrls = [...imageUrls];
            newImageUrls.splice(index, 1);
            setImageUrls(newImageUrls);
        }
    };

    const handleImageUrlChange = (index: number, value: string) => {
        const newImageUrls = [...imageUrls];
        newImageUrls[index] = value;
        setImageUrls(newImageUrls);
    };

    const handleAddColor = () => {
        setColors([...colors, { name: '', hex: '' }]);
    };

    const handleRemoveColor = (index: number) => {
        if (colors.length > 1) {
            const newColors = [...colors];
            newColors.splice(index, 1);
            setColors(newColors);
        }
    };

    const handleColorChange = (index: number, field: 'name' | 'hex', value: string) => {
        const newColors = [...colors];
        newColors[index][field] = value;
        setColors(newColors);
    };
    
    const parseSizes = (sizesInput: string): string[] => {
        const rangeRegex = /^(\d+)-(\d+)$/;
        const match = sizesInput.match(rangeRegex);

        if (match) {
            const start = parseInt(match[1], 10);
            const end = parseInt(match[2], 10);
            if (!isNaN(start) && !isNaN(end) && start <= end) {
                return Array.from({ length: end - start + 1 }, (_, i) => (start + i).toString());
            }
        }
        
        return sizesInput.split(',').map(s => s.trim()).filter(s => s);
    }

    const handleAddProduct = (e: FormEvent) => {
        e.preventDefault();

        const processedSizes = parseSizes(sizes);

        const newProduct = {
            id: `prod_${Date.now()}`,
            name,
            price: parseFloat(price),
            oldPrice: oldPrice ? parseFloat(oldPrice) : undefined,
            brand,
            description,
            genders: selectedGenders,
            category: selectedCategory as Category,
            subcategory,
            image: { imageUrl: imageUrls[0] || '', imageHint: '' },
            imageHover: { imageUrl: imageUrls[1] || imageUrls[0] || '', imageHint: '' },
            images: imageUrls.map(url => ({ imageUrl: url, imageHint: '' })),
            colors,
            sizes: processedSizes,
        };

        onAddProduct(newProduct);
        
        toast({
            title: "Produto adicionado!",
            description: `${name} foi adicionado com sucesso.`,
        });

        // Reset form
        setName('');
        setPrice('');
        setOldPrice('');
        setBrand('');
        setDescription('');
        setSelectedGenders([]);
        setSelectedCategory('');
        setSubcategory('');
        setImageUrls(['']);
        setSizes('');
        setColors([{name: '', hex: ''}]);
        setIsOpen(false);
    }
    
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                 <Button size="sm" className="h-8 gap-1">
                    <PlusCircle className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        Adicionar Produto
                    </span>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[625px]">
                <form onSubmit={handleAddProduct}>
                    <DialogHeader>
                        <DialogTitle>Adicionar Novo Produto</DialogTitle>
                        <DialogDescription>
                            Preencha as informações abaixo para adicionar um novo produto ao catálogo.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-6 max-h-[70vh] overflow-y-auto px-2">
                         <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="product-name" className="text-right">
                                Nome
                            </Label>
                            <Input id="product-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nome do produto" className="col-span-3" />
                        </div>
                         <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="product-price" className="text-right">
                                Preço
                            </Label>
                            <Input id="product-price" value={price} onChange={(e) => setPrice(e.target.value)} type="number" placeholder="99.99" className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="product-old-price" className="text-right">
                                Preço Antigo
                            </Label>
                            <Input id="product-old-price" value={oldPrice} onChange={(e) => setOldPrice(e.target.value)} type="number" placeholder="199.99" className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="product-brand" className="text-right">
                                Marca
                            </Label>
                            <Input id="product-brand" value={brand} onChange={(e) => setBrand(e.target.value)} placeholder="Marca do produto" className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="product-description" className="text-right">
                                Descrição
                            </Label>
                            <Textarea id="product-description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Descreva o produto" className="col-span-3 min-h-[100px]" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label className="text-right">Gênero</Label>
                            <div className="col-span-3 flex items-center gap-4">
                                {(['Masculino', 'Feminino', 'Unissex'] as Gender[]).map(gender => (
                                    <div key={gender} className="flex items-center gap-2">
                                        <Checkbox 
                                            id={`gender-${gender}`} 
                                            checked={selectedGenders.includes(gender)}
                                            onCheckedChange={(checked) => handleGenderChange(gender, !!checked)}
                                        />
                                        <Label htmlFor={`gender-${gender}`}>{gender}</Label>
                                    </div>
                                ))}
                            </div>
                        </div>
                         <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="product-category" className="text-right">
                                Categoria
                            </Label>
                            <Select 
                                value={selectedCategory}
                                onValueChange={handleCategoryChange} 
                                disabled={selectedGenders.length === 0}
                            >
                                <SelectTrigger className="col-span-3">
                                    <SelectValue placeholder="Selecione uma categoria" />
                                </SelectTrigger>
                                <SelectContent>
                                    {availableCategories.map(cat => (
                                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="product-subcategory" className="text-right">
                                Subcategoria
                            </Label>
                            <Select 
                                value={subcategory} 
                                onValueChange={setSubcategory} 
                                disabled={!selectedCategory || availableSubcategories.length === 0}
                            >
                                <SelectTrigger className="col-span-3">
                                    <SelectValue placeholder="Selecione uma subcategoria" />
                                </SelectTrigger>
                                <SelectContent>
                                    {availableSubcategories.map(sub => (
                                        <SelectItem key={sub} value={sub}>{sub}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                         <div className="grid grid-cols-4 items-start gap-4">
                            <Label className="text-right pt-2">
                                Imagens
                            </Label>
                            <div className="col-span-3 space-y-2">
                                {imageUrls.map((url, index) => (
                                    <div key={index} className="flex items-center gap-2">
                                        <Input 
                                            id={`product-image-url-${index}`} 
                                            placeholder="https://..." 
                                            value={url}
                                            onChange={(e) => handleImageUrlChange(index, e.target.value)}
                                        />
                                        <Button 
                                            type="button" 
                                            variant="destructive" 
                                            size="icon"
                                            onClick={() => handleRemoveImageUrl(index)}
                                            disabled={imageUrls.length === 1}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                ))}
                                <Button type="button" variant="outline" size="sm" onClick={handleAddImageUrl}>
                                    <PlusCircle className="mr-2 h-4 w-4" />
                                    Adicionar outra imagem
                                </Button>
                            </div>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="product-sizes" className="text-right">
                                Tamanhos
                            </Label>
                            <Input id="product-sizes" value={sizes} onChange={(e) => setSizes(e.target.value)} placeholder="P,M,G ou 34-43 (separados por vírgula)" className="col-span-3" />
                        </div>
                         <div className="grid grid-cols-4 items-start gap-4">
                            <Label className="text-right pt-2">
                                Cores
                            </Label>
                            <div className="col-span-3 space-y-2">
                                {colors.map((color, index) => (
                                     <div key={index} className="flex items-center gap-2">
                                        <Input 
                                            placeholder="Nome da cor (ex: Preto)" 
                                            value={color.name}
                                            onChange={(e) => handleColorChange(index, 'name', e.target.value)}
                                        />
                                         <Input 
                                            placeholder="Hex (ex: #000000)" 
                                            value={color.hex}
                                            onChange={(e) => handleColorChange(index, 'hex', e.target.value)}
                                            className="w-28"
                                        />
                                        <Button 
                                            type="button" 
                                            variant="destructive" 
                                            size="icon"
                                            onClick={() => handleRemoveColor(index)}
                                            disabled={colors.length === 1}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                ))}
                                 <Button type="button" variant="outline" size="sm" onClick={handleAddColor}>
                                    <PlusCircle className="mr-2 h-4 w-4" />
                                    Adicionar cor
                                </Button>
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" variant="secondary">
                                Cancelar
                            </Button>
                        </DialogClose>
                        <Button type="submit">Salvar Produto</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

function EditProductDialog({ product, onUpdateProduct, children }: { product: Product, onUpdateProduct: (updatedProduct: any) => void, children: React.ReactNode }) {
    const { toast } = useToast();
    
    const [name, setName] = useState(product.name);
    const [price, setPrice] = useState(product.price.toString());
    const [oldPrice, setOldPrice] = useState(product.oldPrice?.toString() || '');
    const [brand, setBrand] = useState(product.brand || '');
    const [description, setDescription] = useState(product.description || '');
    const [imageUrls, setImageUrls] = useState(product.images?.map(i => i.imageUrl) || [product.image.imageUrl]);
    const [colors, setColors] = useState(product.colors || [{ name: '', hex: '' }]);
    const [sizes, setSizes] = useState(product.sizes?.join(', ') || '');
    const [subcategory, setSubcategory] = useState(product.subcategory || '');

    const [selectedGenders, setSelectedGenders] = useState<Gender[]>(product.genders || []);
    const [selectedCategory, setSelectedCategory] = useState<Category | ''>(product.category || '');
    const [isOpen, setIsOpen] = useState(false);

    const availableCategories = useMemo(() => {
        if (selectedGenders.length === 0) return Object.keys(detailedCategories);
        return Object.entries(detailedCategories)
            .filter(([_, details]) => selectedGenders.some(gender => details.genders.includes(gender)))
            .map(([categoryName]) => categoryName);
    }, [selectedGenders]);

    const availableSubcategories = useMemo(() => {
        if (!selectedCategory) return [];
        const categoryDetails = detailedCategories[selectedCategory as Category];
        if (!categoryDetails) return [];
        if (selectedGenders.length === 0) return Object.keys(categoryDetails.subcategories);
        return Object.entries(categoryDetails.subcategories)
            .filter(([_, subGenders]) => selectedGenders.some(gender => subGenders.includes(gender)))
            .map(([subCategoryName]) => subCategoryName);
    }, [selectedCategory, selectedGenders]);

    const handleGenderChange = (gender: Gender, checked: boolean) => {
        setSelectedGenders(prev => {
            const newGenders = checked ? [...prev, gender] : prev.filter(g => g !== gender);
            if (!availableCategories.includes(selectedCategory)) {
                 setSelectedCategory('');
            }
            return newGenders;
        });
    };
    
    useEffect(() => {
        if (selectedCategory && !availableCategories.includes(selectedCategory)) {
            setSelectedCategory('');
            setSubcategory('');
        }
    }, [availableCategories, selectedCategory]);

    useEffect(() => {
        setSubcategory('');
    }, [selectedCategory]);

    const handleCategoryChange = (value: string) => {
        setSelectedCategory(value as Category);
    };

    const handleAddImageUrl = () => setImageUrls([...imageUrls, '']);
    const handleRemoveImageUrl = (index: number) => {
        if (imageUrls.length > 1) setImageUrls(imageUrls.filter((_, i) => i !== index));
    };
    const handleImageUrlChange = (index: number, value: string) => {
        const newImageUrls = [...imageUrls];
        newImageUrls[index] = value;
        setImageUrls(newImageUrls);
    };

    const handleAddColor = () => setColors([...colors, { name: '', hex: '' }]);
    const handleRemoveColor = (index: number) => {
        if (colors.length > 1) setColors(colors.filter((_, i) => i !== index));
    };
    const handleColorChange = (index: number, field: 'name' | 'hex', value: string) => {
        const newColors = [...colors];
        newColors[index][field] = value;
        setColors(newColors);
    };
    
    const parseSizes = (sizesInput: string): string[] => {
        const rangeRegex = /^(\d+)-(\d+)$/;
        const match = sizesInput.match(rangeRegex);
        if (match) {
            const start = parseInt(match[1], 10);
            const end = parseInt(match[2], 10);
            if (!isNaN(start) && !isNaN(end) && start <= end) {
                return Array.from({ length: end - start + 1 }, (_, i) => (start + i).toString());
            }
        }
        return sizesInput.split(',').map(s => s.trim()).filter(s => s);
    }

    const handleUpdateProduct = (e: FormEvent) => {
        e.preventDefault();
        const processedSizes = parseSizes(sizes);
        const updatedProduct = {
            ...product,
            name,
            price: parseFloat(price),
            oldPrice: oldPrice ? parseFloat(oldPrice) : undefined,
            brand,
            description,
            genders: selectedGenders,
            category: selectedCategory as Category,
            subcategory,
            image: { imageUrl: imageUrls[0] || '', imageHint: product.image.imageHint },
            imageHover: { imageUrl: imageUrls[1] || imageUrls[0] || '', imageHint: product.imageHover.imageHint },
            images: imageUrls.map(url => ({ imageUrl: url, imageHint: '' })),
            colors,
            sizes: processedSizes,
        };
        onUpdateProduct(updatedProduct);
        toast({ title: "Produto atualizado!", description: `${name} foi atualizado com sucesso.` });
        setIsOpen(false);
    }
    
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-[625px]">
                <form onSubmit={handleUpdateProduct}>
                    <DialogHeader>
                        <DialogTitle>Editar Produto</DialogTitle>
                        <DialogDescription>
                            Atualize as informações do produto abaixo.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-6 max-h-[70vh] overflow-y-auto px-2">
                         <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="edit-product-name" className="text-right">Nome</Label>
                            <Input id="edit-product-name" defaultValue={name} onChange={(e) => setName(e.target.value)} className="col-span-3" />
                        </div>
                         <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="edit-product-price" className="text-right">Preço</Label>
                            <Input id="edit-product-price" defaultValue={price} onChange={(e) => setPrice(e.target.value)} type="number" className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="edit-product-old-price" className="text-right">Preço Antigo</Label>
                            <Input id="edit-product-old-price" defaultValue={oldPrice} onChange={(e) => setOldPrice(e.target.value)} type="number" className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="edit-product-brand" className="text-right">Marca</Label>
                            <Input id="edit-product-brand" defaultValue={brand} onChange={(e) => setBrand(e.target.value)} className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="edit-product-description" className="text-right">Descrição</Label>
                            <Textarea id="edit-product-description" defaultValue={description} onChange={(e) => setDescription(e.target.value)} className="col-span-3 min-h-[100px]" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label className="text-right">Gênero</Label>
                            <div className="col-span-3 flex items-center gap-4">
                                {(['Masculino', 'Feminino', 'Unissex'] as Gender[]).map(gender => (
                                    <div key={gender} className="flex items-center gap-2">
                                        <Checkbox 
                                            id={`edit-gender-${gender}`} 
                                            checked={selectedGenders.includes(gender)}
                                            onCheckedChange={(checked) => handleGenderChange(gender, !!checked)}
                                        />
                                        <Label htmlFor={`edit-gender-${gender}`}>{gender}</Label>
                                    </div>
                                ))}
                            </div>
                        </div>
                         <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="edit-product-category" className="text-right">Categoria</Label>
                            <Select value={selectedCategory} onValueChange={handleCategoryChange} disabled={selectedGenders.length === 0}>
                                <SelectTrigger className="col-span-3"><SelectValue placeholder="Selecione uma categoria" /></SelectTrigger>
                                <SelectContent>{availableCategories.map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}</SelectContent>
                            </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="edit-product-subcategory" className="text-right">Subcategoria</Label>
                            <Select value={subcategory} onValueChange={setSubcategory} disabled={!selectedCategory || availableSubcategories.length === 0}>
                                <SelectTrigger className="col-span-3"><SelectValue placeholder="Selecione uma subcategoria" /></SelectTrigger>
                                <SelectContent>{availableSubcategories.map(sub => <SelectItem key={sub} value={sub}>{sub}</SelectItem>)}</SelectContent>
                            </Select>
                        </div>
                         <div className="grid grid-cols-4 items-start gap-4">
                            <Label className="text-right pt-2">Imagens</Label>
                            <div className="col-span-3 space-y-2">
                                {imageUrls.map((url, index) => (
                                    <div key={index} className="flex items-center gap-2">
                                        <Input value={url} onChange={(e) => handleImageUrlChange(index, e.target.value)} />
                                        <Button type="button" variant="destructive" size="icon" onClick={() => handleRemoveImageUrl(index)} disabled={imageUrls.length === 1}><Trash2 className="h-4 w-4" /></Button>
                                    </div>
                                ))}
                                <Button type="button" variant="outline" size="sm" onClick={handleAddImageUrl}><PlusCircle className="mr-2 h-4 w-4" />Adicionar outra imagem</Button>
                            </div>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="edit-product-sizes" className="text-right">Tamanhos</Label>
                            <Input id="edit-product-sizes" defaultValue={sizes} onChange={(e) => setSizes(e.target.value)} placeholder="P,M,G ou 34-43 (separados por vírgula)" className="col-span-3" />
                        </div>
                         <div className="grid grid-cols-4 items-start gap-4">
                            <Label className="text-right pt-2">Cores</Label>
                            <div className="col-span-3 space-y-2">
                                {colors.map((color, index) => (
                                     <div key={index} className="flex items-center gap-2">
                                        <Input placeholder="Nome da cor" value={color.name} onChange={(e) => handleColorChange(index, 'name', e.target.value)} />
                                        <Input placeholder="Hex" value={color.hex} onChange={(e) => handleColorChange(index, 'hex', e.target.value)} className="w-28" />
                                        <Button type="button" variant="destructive" size="icon" onClick={() => handleRemoveColor(index)} disabled={colors.length === 1}><Trash2 className="h-4 w-4" /></Button>
                                    </div>
                                ))}
                                 <Button type="button" variant="outline" size="sm" onClick={handleAddColor}><PlusCircle className="mr-2 h-4 w-4" />Adicionar cor</Button>
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild><Button type="button" variant="secondary">Cancelar</Button></DialogClose>
                        <Button type="submit">Salvar Alterações</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

function ProductManager() {
    const [products, setProducts] = useState<Product[]>(initialProducts);

    const handleAddProduct = (newProduct: Product) => {
        setProducts(prev => [newProduct, ...prev]);
    }
    
    const handleUpdateProduct = (updatedProduct: Product) => {
        setProducts(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));
    }

    const handleRemoveProduct = (productId: string) => {
        setProducts(prev => prev.filter(p => p.id !== productId));
    }

    return (
        <Tabs defaultValue="all">
            <div className="flex items-center">
                <TabsList>
                    <TabsTrigger value="all">Todos</TabsTrigger>
                    <TabsTrigger value="active">Ativos</TabsTrigger>
                    <TabsTrigger value="draft">Rascunho</TabsTrigger>
                    <TabsTrigger value="archived" className="hidden sm:flex">
                        Arquivados
                    </TabsTrigger>
                </TabsList>
                <div className="ml-auto flex items-center gap-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm" className="h-8 gap-1">
                                <ListFilter className="h-3.5 w-3.5" />
                                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                    Filtro
                                </span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Filtrar por</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Ativo</DropdownMenuItem>
                            <DropdownMenuItem>Rascunho</DropdownMenuItem>
                            <DropdownMenuItem>Arquivado</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <Button size="sm" variant="outline" className="h-8 gap-1">
                        <File className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                            Exportar
                        </span>
                    </Button>
                    <AddProductDialog onAddProduct={handleAddProduct} />
                </div>
            </div>
            <TabsContent value="all">
                 <Card>
                    <CardHeader>
                        <CardTitle>Produtos</CardTitle>
                        <CardDescription>
                            Gerencie seus produtos aqui. Adicione, edite ou remova produtos.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="hidden w-[100px] sm:table-cell">
                                        <span className="sr-only">Imagem</span>
                                    </TableHead>
                                    <TableHead>Nome</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="hidden md:table-cell">Preço</TableHead>
                                    <TableHead className="hidden md:table-cell">
                                        Categoria
                                    </TableHead>
                                    <TableHead>
                                        <span className="sr-only">Ações</span>
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {products.map(product => (
                                    <TableRow key={product.id}>
                                        <TableCell className="hidden sm:table-cell">
                                            <Image
                                                alt={product.name}
                                                className="aspect-square rounded-md object-cover"
                                                height="64"
                                                src={product.image.imageUrl}
                                                width="64"
                                            />
                                        </TableCell>
                                        <TableCell className="font-medium">
                                            {product.name}
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline">Ativo</Badge>
                                        </TableCell>
                                        <TableCell className="hidden md:table-cell">
                                            R$ {product.price.toFixed(2)}
                                        </TableCell>
                                        <TableCell className="hidden md:table-cell">
                                            {product.category}
                                        </TableCell>
                                        <TableCell>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button
                                                        aria-haspopup="true"
                                                        size="icon"
                                                        variant="ghost"
                                                    >
                                                        <MoreHorizontal className="h-4 w-4" />
                                                        <span className="sr-only">Toggle menu</span>
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuLabel>Ações</DropdownMenuLabel>
                                                     <EditProductDialog product={product} onUpdateProduct={handleUpdateProduct}>
                                                        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                                            <Edit className="mr-2 h-4 w-4" />
                                                            Editar
                                                        </DropdownMenuItem>
                                                    </EditProductDialog>
                                                    <DropdownMenuItem onClick={() => handleRemoveProduct(product.id)}>
                                                        <Trash2 className="mr-2 h-4 w-4" />
                                                        Remover
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                    <CardFooter>
                        <div className="text-xs text-muted-foreground">
                            Mostrando <strong>1-{products.length}</strong> de <strong>{products.length}</strong> produtos
                        </div>
                    </CardFooter>
                </Card>
            </TabsContent>
        </Tabs>
    )
}


// The admin panel content to show after successful login
function AdminDashboard() {
  return (
    <SidebarProvider>
      <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] group">
          <Sidebar>
            <SidebarHeader>
              <h2 className="text-xl font-semibold tracking-tight">Pisa Vibe</h2>
            </SidebarHeader>
            <SidebarContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton href="#" isActive>
                    <LayoutGrid />
                    Produtos
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarContent>
          </Sidebar>
        <div className="flex flex-col">
            <AdminHeader />
            <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
               <ProductManager />
            </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

// The login form for the admin page
export default function AdminLoginPage() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is already authenticated in localStorage
    const authStatus = localStorage.getItem('isAdminAuthenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
  }, []);


  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    // NEVER store passwords in plaintext in a real application.
    // This is for demonstration purposes only.
    if (password === 'Retnuoctercou-13@') {
      localStorage.setItem('isAdminAuthenticated', 'true');
      toast({
        title: 'Acesso concedido',
        description: 'Bem-vindo ao painel administrativo.',
      });
      setIsAuthenticated(true);
    } else {
      toast({
        variant: 'destructive',
        title: 'Acesso Negado',
        description: 'A senha inserida está incorreta.',
      });
      setPassword('');
    }
  };

  if (isAuthenticated) {
    return <AdminDashboard />;
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 dark:bg-gray-950 p-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <div className="mx-auto bg-primary text-primary-foreground rounded-full h-16 w-16 flex items-center justify-center mb-4">
             <ShieldCheck className="h-8 w-8" />
          </div>
          <CardTitle className="text-2xl">Acesso Restrito</CardTitle>
          <CardDescription>
            Esta página é protegida. Por favor, insira a senha.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">Senha de Acesso</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              <ShieldAlert className="mr-2 h-4 w-4" />
              Entrar
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
