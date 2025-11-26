-- Add policy for inserting order items during checkout
CREATE POLICY "Users can create order items for their orders"
  ON public.order_items FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.orders
      WHERE id = order_id AND buyer_id = auth.uid()
    )
  );

-- Enable realtime for cart items so cart updates instantly
ALTER TABLE public.cart_items REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.cart_items;