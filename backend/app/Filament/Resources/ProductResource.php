<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ProductResource\Pages;
use App\Filament\Resources\ProductResource\RelationManagers;
use App\Models\Product;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class ProductResource extends Resource
{
    protected static ?string $model = Product::class;

    protected static ?string $navigationIcon = 'heroicon-o-cube';
    protected static ?string $navigationGroup = 'Catalog';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('slug')
                    ->label('Slug')
                    ->required()
                    ->maxLength(255)
                    ->helperText('URL slug, ví dụ: ba-k1'),
                Forms\Components\TextInput::make('title')
                    ->label('Tên sản phẩm')
                    ->required()
                    ->maxLength(255),
                Forms\Components\Select::make('category_id')
                    ->label('Danh mục')
                    ->relationship('category', 'name')
                    ->searchable()
                    ->required(),
                Forms\Components\FileUpload::make('images')
                    ->label('Hình ảnh')
                    ->multiple()
                    ->directory('products')
                    ->image()
                    ->imageEditor()
                    ->reorderable()
                    ->helperText('Tải lên 1 hoặc nhiều ảnh; lưu trong storage/app/public/products'),
                Forms\Components\TextInput::make('price')
                    ->label('Giá (VND)')
                    ->required()
                    ->numeric()
                    ->prefix('₫'),
                Forms\Components\TextInput::make('compare_price')
                    ->label('Giá gạch (nếu có)')
                    ->numeric()
                    ->prefix('₫'),
                Forms\Components\TextInput::make('power_watt')
                    ->label('Công suất (W)')
                    ->numeric(),
                Forms\Components\TextInput::make('battery_hours')
                    ->label('Pin (giờ)')
                    ->numeric(),
                Forms\Components\TextInput::make('dimensions')
                    ->label('Kích thước')
                    ->maxLength(255),
                Forms\Components\TextInput::make('weight')
                    ->label('Khối lượng (kg)')
                    ->numeric(),
                Forms\Components\TextInput::make('connectivity')
                    ->label('Kết nối')
                    ->maxLength(255),
                Forms\Components\Toggle::make('is_customizable')
                    ->label('Cho phép custom')
                    ->required(),
                Forms\Components\RichEditor::make('description_html')
                    ->label('Mô tả')
                    ->columnSpanFull()
                    ->toolbarButtons(['bold', 'italic', 'strike', 'bulletList', 'orderedList', 'link']),
                Forms\Components\TextInput::make('rating_avg')
                    ->label('Điểm trung bình')
                    ->numeric()
                    ->default(0)
                    ->disabled()
                    ->helperText('Tự động tính từ reviews'),
                Forms\Components\TextInput::make('rating_count')
                    ->label('Số đánh giá')
                    ->numeric()
                    ->default(0)
                    ->disabled()
                    ->helperText('Tự động tính từ reviews'),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('slug')
                    ->label('Slug')
                    ->searchable()
                    ->limit(24),
                Tables\Columns\TextColumn::make('title')
                    ->label('Tên')
                    ->searchable()
                    ->limit(32),
                Tables\Columns\TextColumn::make('price')
                    ->label('Giá')
                    ->money('VND', locale: 'vi_VN')
                    ->sortable(),
                Tables\Columns\TextColumn::make('compare_price')
                    ->label('Giá gạch')
                    ->money('VND', locale: 'vi_VN')
                    ->sortable(),
                Tables\Columns\TextColumn::make('power_watt')
                    ->label('W')
                    ->numeric()
                    ->sortable(),
                Tables\Columns\TextColumn::make('battery_hours')
                    ->label('Pin (h)')
                    ->numeric()
                    ->sortable(),
                Tables\Columns\TextColumn::make('dimensions')
                    ->label('Kích thước')
                    ->searchable()
                    ->limit(24),
                Tables\Columns\TextColumn::make('weight')
                    ->label('Kg')
                    ->numeric()
                    ->sortable(),
                Tables\Columns\TextColumn::make('connectivity')
                    ->label('Kết nối')
                    ->searchable()
                    ->limit(20),
                Tables\Columns\IconColumn::make('is_customizable')
                    ->label('Custom')
                    ->boolean(),
                Tables\Columns\TextColumn::make('rating_avg')
                    ->label('★ TB')
                    ->numeric()
                    ->sortable(),
                Tables\Columns\TextColumn::make('rating_count')
                    ->label('#RV')
                    ->numeric()
                    ->sortable(),
                Tables\Columns\TextColumn::make('category.name')
                    ->label('Danh mục')
                    ->sortable()
                    ->limit(20),
                Tables\Columns\TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                Tables\Columns\TextColumn::make('updated_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListProducts::route('/'),
            'create' => Pages\CreateProduct::route('/create'),
            'edit' => Pages\EditProduct::route('/{record}/edit'),
        ];
    }
}
