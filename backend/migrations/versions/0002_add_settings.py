"""add settings table

Revision ID: 0002_add_settings
Revises: 0001_seed_admin
Create Date: 2026-08-24 00:30:00.000000
"""
from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision = '0002_add_settings'
down_revision = '0001_seed_admin'
branch_labels = None
depends_on = None


def upgrade():
    bind = op.get_bind()
    if bind.dialect.has_table(bind, 'settings'):
        return

    op.create_table(
        'settings',
        sa.Column('id', sa.Integer(), primary_key=True),
        sa.Column('key', sa.String(length=128), nullable=False, unique=True),
        sa.Column('value', sa.Text(), nullable=True),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.func.now()),
        sa.Column('updated_at', sa.DateTime(timezone=True), nullable=True),
    )


def downgrade():
    bind = op.get_bind()
    if bind.dialect.has_table(bind, 'settings'):
        op.drop_table('settings')
