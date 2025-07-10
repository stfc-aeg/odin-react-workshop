from .base.base_adapter import BaseAdapter
from .controller import WorkshopController, WorkshopError


class WorkshopAdapter(BaseAdapter):
    """WORKSHOP Adapter class inheriting base adapter functionality."""

    controller_cls = WorkshopController
    error_cls = WorkshopError